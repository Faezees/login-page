import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBookings = createAsyncThunk(
  "bookings/fetch",
  async (role: string, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);

      // تعداد آیتم بر اساس نقش
      let count = 2;
      if (role === "admin") count = 5;
      else if (role === "owner") count = 10;

      return data.slice(0, count);
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

const slice = createSlice({
  name: "bookings",
  initialState: {
    items: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchBookings.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchBookings.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as any)?.message || "Failed";
      });
  },
});

export default slice.reducer;
