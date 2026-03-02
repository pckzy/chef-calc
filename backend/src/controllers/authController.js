import { supabase } from '../config/supabaseClient.js';

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, email }]);
      
      if (profileError) throw profileError;
    }

    res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', session: data.session });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};