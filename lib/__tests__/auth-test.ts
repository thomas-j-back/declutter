import { renderHook, act} from '@testing-library/react-native';
import { useAuth } from '../auth';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';

jest.mock('../supabase', () => ({
    supabase: {
        auth: {
          getSession: jest.fn().mockImplementation(() => Promise.resolve({ data: { session: null }, error: null })),
          onAuthStateChange: jest.fn().mockImplementation((_event, session) => {
            return {
                data: { subscription: {
                    unsubscribe: jest.fn(),
                } },
                error: null,
            };
          }),
        },
      },
}));

describe('Authentication Functions + useAuth Hook', () => {
   it('should return an empty session when no session is available', () => {
    const mockSession = null;
    (supabase.auth.getSession as jest.Mock)
    (supabase.auth.onAuthStateChange as jest.Mock);;
    const { result } = renderHook(() => useAuth());
    expect(result.current.session).toBe(null);
});
});

