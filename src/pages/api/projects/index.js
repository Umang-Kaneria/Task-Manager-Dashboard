import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  const projectsRef = collection(db, 'projects');

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      let q = projectsRef;
      if (userId) {
        const { query, where } = await import('firebase/firestore');
        q = query(projectsRef, where('userId', '==', userId));
      }
      const snapshot = await getDocs(q);
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { name, description, userId, tasks } = req.body;
    try {
      const docRef = await addDoc(projectsRef, { name, description, userId, tasks });
      res.status(201).json({ id: docRef.id, name, description, userId, tasks });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
