import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, password } = req.body;
  try {
    console.log({email, password})
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log({userCredential})
    // Optionally, create a session/cookie here
    res.status(200).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
