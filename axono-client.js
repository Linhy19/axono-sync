(function initAxonoClient() {
  if (!window.supabase || !window.AXONO_CONFIG) {
    throw new Error('AXONO: chybí Supabase klient nebo konfigurace.');
  }

  const client = window.supabase.createClient(
    window.AXONO_CONFIG.supabaseUrl,
    window.AXONO_CONFIG.supabaseAnonKey
  );

  window.axonoSupabase = client;
  window.AxonoAuth = Object.freeze({
    async getSession() {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      return data.session;
    },

    async signIn(email, password) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.session;
    },

    async signOut() {
      const { error } = await client.auth.signOut();
      if (error) throw error;
    },

    onChange(callback) {
      return client.auth.onAuthStateChange((_event, session) => callback(session));
    }
  });
})();
