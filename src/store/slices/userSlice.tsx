import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../interfaces/redux';
import {
    signup,
    verify,
    signin,
    logout,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
    forgotPassword,
    resetPassword,
    updateMeByEmail,
    deleteMeByEmail,
    updatePassword,
} from '../../services/Auth/user';
import { IUser } from '../../types/IUser';
import asyncStatus from '../../types/asyncStatus';

const currentUser = JSON.parse(localStorage.getItem('USER') || '{}');

export const register = createAsyncThunk(
    'user/register',
    async (data: IUser, { rejectWithValue }) => {
        try {
            const response = await signup(data);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async (token: string | null, { rejectWithValue }) => {
        try {
            const response = await verify(token);
            if (response.error) throw new Error(response.error);

            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const sendForgotemail = createAsyncThunk(
    'user/sendForgotemail',
    async (body: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(body);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const resetUserPassword = createAsyncThunk(
    'user/resetUserPassword',
    async (body: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await resetPassword(body);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const login = createAsyncThunk('user/login', async (data: IUser, { rejectWithValue }) => {
    try {
        const response = await signin(data);
        if (response.error) throw new Error(response.error);
        return response;
    } catch (e) {
        return rejectWithValue(e as Error);
    }
});

export const logOut = createAsyncThunk('user/logOut', async () => {
    await logout();
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data as IUser[];
});

export const fetchUserByEmail = createAsyncThunk(
    'user/fetchUserByEmail',
    async (email: string | undefined, { rejectWithValue }) => {
        try {
            const response = await getUserByEmail(email);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data: IUser, { rejectWithValue }) => {
        const { email, ...fields } = data;
        try {
            const response = await updateUserByEmail(email, fields as IUser);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    },
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await deleteUserByEmail(email);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    },
);

export const updateMe = createAsyncThunk(
    'user/updateMe',
    async (data: IUser, { rejectWithValue }) => {
        const { ...fields } = data;
        try {
            const response = await updateMeByEmail(fields as IUser);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    },
);

export const deleteMe = createAsyncThunk(
    'user/deleteMe',
    async (body: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await deleteMeByEmail(body);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    },
);

export const updateMyPassword = createAsyncThunk(
    'user/updateMyPassword',
    async (body: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await updatePassword(body);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    },
);

interface UsersState {
    users: IUser[];
    user: IUser | null | string;
    status: asyncStatus;
    error: null | string | undefined;
    isSuccess: boolean;
    message: string;
}

const initialState: UsersState = {
    users: [],
    isSuccess: false,
    user: currentUser,
    status: asyncStatus.idle,
    error: null,
    message: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = null;
            state.status = asyncStatus.idle;
            state.isSuccess = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(register.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(verifyEmail.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(verifyEmail.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(login.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(login.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(resetUserPassword.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(resetUserPassword.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(resetUserPassword.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(logOut.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(logOut.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.user = null;
            })
            .addCase(logOut.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(sendForgotemail.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(sendForgotemail.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(sendForgotemail.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(fetchAllUsers.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchAllUsers.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
            })
            .addCase(fetchAllUsers.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(updateUser.pending, (state: UsersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateUser.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                const index = state.users.findIndex(
                    (user: IUser) => user.email === action.payload.email,
                );
                state.users[index] = {
                    ...state.users[index],
                    ...action.payload,
                };
            })
            .addCase(updateUser.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(fetchUserByEmail.pending, (state: UsersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchUserByEmail.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.user = action.payload;
            })
            .addCase(fetchUserByEmail.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(deleteUser.pending, (state: UsersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(deleteUser.fulfilled, (state: UsersState, { payload }) => {
                state.status = asyncStatus.succeeded;
                state.users = state.users.filter((user) => user.email !== payload);
            })

            .addCase(deleteUser.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(updateMe.pending, (state: UsersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateMe.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.user = action.payload.user;
            })
            .addCase(updateMe.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(updateMyPassword.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateMyPassword.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
            })
            .addCase(updateMyPassword.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = action.payload as string;
            });
        builder
            .addCase(deleteMe.pending, (state: UsersState) => {
                state.status = asyncStatus.loading;
                state.isSuccess = false;
            })
            .addCase(deleteMe.fulfilled, (state: UsersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.user = null;
            })
            .addCase(deleteMe.rejected, (state: UsersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
    },
});
export const authUserStatus = (state: RootState) => state.users.status;
export const authUserSuccess = (state: RootState) => state.users.isSuccess;
export const authUser = (state: RootState) => state.users.user;
export const allAuthUser = (state: RootState) => state.users.users;
export const regMessage = (state: RootState) => state.users.message;
export const authError = (state: RootState) => state.users.error;
export const { clearState } = userSlice.actions;

export default userSlice.reducer;
