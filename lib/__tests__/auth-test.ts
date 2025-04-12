import { renderHook, act, waitFor} from '@testing-library/react-native';
import { useAuth } from '../auth';
import { supabase } from '../supabase';
import { Session, User } from '@supabase/supabase-js';

jest.mock('../supabase', () => ({
    supabase: {
        auth: {
          getSession: jest.fn(),
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

const mockUser: User = {
    id: '123',
    email: 'test@test.com',
    app_metadata: {},
    user_metadata: {},
    aud: '123',
    created_at: '123',
    confirmed_at: '123',
    email_confirmed_at: '123',
    phone_confirmed_at: '123',
    last_sign_in_at: '123',
    role: '123',
};
const mockSession: Session = {
    access_token: '123',
    refresh_token: '123',
    expires_in: 123,
    token_type: 'Bearer',
    user: mockUser
};

describe('Authentication Functions + useAuth Hook', () => {
   it('should return an empty session when no session is available', async () => {
        (supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({ data: { session: null }, error: null });
        
        const { result } = renderHook(() => useAuth());
        await waitFor(() => {
            expect(result.current.session).toBe(null);
            expect(result.current.loading).toBe(false);
        });
        
    }); 

    it('should return the correct session when a session is available', async () => {
        
        (supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({ data: { session: mockSession }, error: null });
        
        const { result } = renderHook(() => useAuth());
        
        await waitFor(() => {
            expect(result.current.session).toEqual(mockSession);
        })
    });

    it('should update the session when the subscription updates', async () => {
       
    })
});
