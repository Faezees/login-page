"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { logout } from "../src/store/slices/authSlice";
import { fetchBookings } from "../src/store/slices/bookingsSlice";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.bookings);
  const auth = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (!auth.user) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (!storedUser || !storedToken) {
        router.replace("/");
        return;
      }

      if (storedUser && storedToken) {
        dispatch({
          type: "auth/setUser",
          payload: { user: JSON.parse(storedUser), token: storedToken },
        });
      } else {
        router.replace("/");
        return;
      }
    }

    if (auth.user) {
      dispatch(fetchBookings(auth.user.role));
    }
  }, [auth.user, dispatch, router]);

  if (!mounted) return null;

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
            {auth?.user?.name[0]}
          </div>
          <div className="font-semibold text-lg">{auth?.user?.name}</div>
        </div>

        <nav className="space-y-3 text-gray-700">
          <div className="px-3 py-2 rounded bg-indigo-50 text-indigo-700">
            Bookings
          </div>
          <div className="px-3 py-2 rounded hover:bg-gray-100">Theme</div>
          <div className="px-3 py-2 rounded hover:bg-gray-100">Upcoming</div>
          <div className="px-3 py-2 rounded hover:bg-gray-100">Analytics</div>
          <div className="px-3 py-2 rounded hover:bg-gray-100">Settings</div>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={logoutHandler} className="text-red-500 font-semibold">
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* دسکتاپ Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r p-6">
        <SidebarContent />
      </aside>

      {/* موبایل Drawer */}
      <div className="md:hidden">
        <button
          className="p-2 m-2 rounded-md bg-gray-200"
          onClick={() => setMobileOpen(true)}
        >
          &#9776; {/* آیکون سه خط */}
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setMobileOpen(false)}
          >
            <aside
              className="absolute left-0 top-0 w-64 h-full bg-white p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </aside>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {auth.user?.name ?? "Oudib"}
            </h1>
            <p className="text-gray-500">
              Here's an overview for your business
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="text-sm text-gray-500">Visitor this month</div>
            <div className="text-3xl font-bold mt-2">2,420</div>
            <div className="text-green-500 text-sm mt-1">
              ↑ 40% vs last month
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <div className="text-sm text-gray-500">New Bookings</div>
            <div className="text-3xl font-bold mt-2">122</div>
            <div className="text-green-500 text-sm mt-1">
              ↑ 20% vs last month
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <div className="text-sm text-gray-500">Monthly booking</div>
            <div className="text-3xl font-bold mt-2">502</div>
            <div className="text-green-500 text-sm mt-1">
              ↑ 40% vs last month
            </div>
          </div>
        </div>

        {/* Pending bookings */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              Pending booking{" "}
              <span className="bg-black text-white rounded-full px-2 ml-2">
                20
              </span>
            </h3>
            <button
              onClick={() => dispatch(fetchBookings(auth?.user?.role || ""))}
              className="px-3 py-1 border rounded"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="space-y-4">
              <div className="h-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-24 bg-gray-100 rounded animate-pulse" />
            </div>
          )}

          {error && (
            <div className="text-red-500">
              {error}{" "}
              <button
                onClick={() => dispatch(fetchBookings(auth.user?.role || ""))}
                className="ml-3 px-2 py-1 border rounded"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="text-gray-500">No bookings found.</div>
          )}

          {!loading &&
            !error &&
            items.map((b: any) => (
              <div
                key={b.id}
                className="border rounded p-4 mt-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-indigo-600">
                    New booking • 3 hours ago
                  </div>
                  <div className="font-medium">
                    {b.name} <span className="text-gray-500">| {b.phone}</span>
                  </div>
                  <div className="text-sm text-gray-500">{b.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-1 border rounded">Reject</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    Approve
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

