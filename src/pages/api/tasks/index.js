import { db } from '../../../lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

export default async function handler(req, res) {
  const tasksRef = collection(db, 'tasks');

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      let q = tasksRef;
      if (userId) {
        const { query, where } = await import('firebase/firestore');
        q = query(tasksRef, where('userId', '==', userId));
      }
      const snapshot = await getDocs(q);
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { title, status, userId } = req.body;
    try {
      const docRef = await addDoc(tasksRef, { title, status, userId });
      res.status(201).json({ id: docRef.id, title, status, userId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { id, ...updates } = req.body;
    try {
      const taskDoc = doc(db, 'tasks', id);
      await updateDoc(taskDoc, updates);
      res.status(200).json({ id, ...updates });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      const taskDoc = doc(db, 'tasks', id);
      await deleteDoc(taskDoc);
      res.status(200).json({ id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
