import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Optionally, create a session/cookie here
    res.status(201).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
