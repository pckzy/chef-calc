import { supabase } from '../config/supabaseClient.js';

export const register = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Confirm password does not match", field: "confirmPassword" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long", field: "password" });
    }

    const { data: existingUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists.", field: "email" });
    }

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          email, 
          full_name: fullName 
        }]);
      
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