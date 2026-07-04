import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  HiUser,
  HiEnvelope,
  HiCalendar,
  HiPencilSquare,
  HiShoppingBag,
  HiMapPin,
  HiArrowRightOnRectangle,
  HiCheckCircle,
  HiClock,
  HiCreditCard,
  HiPlus,
  HiTrash,
  HiSparkles,
  HiGift,
  HiShieldCheck,
  HiPhone,
} from "react-icons/hi2";
import Button from "../../../../componenets/common/Button";
import ContainerWrapper from "../../../../componenets/common/ContainerWrapper";
import { authService } from "../../../../services/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.data.user);
      } catch {
        setUser({
          name: "Alex Johnson",
          email: "alex.j@example.com",
          phone: "+1 (555) 000-0000",
          memberSince: "2023",
          tier: "Platinum Member",
          points: 1250,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/auth/login");
  };

  const menuItems = [
    { id: "overview", label: "Hub", icon: HiSparkles },
    { id: "orders", label: "Orders", icon: HiShoppingBag },
    { id: "addresses", label: "Places", icon: HiMapPin },
    { id: "payments", label: "Wallet", icon: HiCreditCard },
    { id: "settings", label: "Config", icon: HiPencilSquare },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="border-brand-500 h-12 w-12 rounded-full border-4 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50/50 pt-32 pb-20 text-left">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-brand-500/5 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px]" />
        <div className="bg-brand-400/10 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-[100px]" />
      </div>

      <ContainerWrapper className="relative z-10">
        {/* Floating Header Card */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center justify-between gap-6 rounded-[3rem] border border-gray-100 bg-white p-8 shadow-sm md:flex-row"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="bg-brand-50 flex h-24 w-24 items-center justify-center rounded-3xl shadow-inner">
                <HiUser className="text-brand-500 h-12 w-12" />
              </div>
              <div className="bg-brand-500 absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg">
                <HiShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h1 className="font-heading text-4xl leading-tight text-gray-900">
                {user?.name}
              </h1>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-brand-500 text-sm font-bold tracking-widest uppercase">
                  {user?.tier}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-500">
                  Since {user?.memberSince}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Available Points
              </p>
              <p className="text-brand-500 text-3xl font-bold">
                {user?.points}
              </p>
            </div>
            <div className="h-12 w-px bg-gray-100" />
            <button
              onClick={handleLogout}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 transition-all hover:bg-red-50"
            >
              <HiArrowRightOnRectangle className="h-6 w-6 text-gray-400 transition-colors group-hover:text-red-500" />
            </button>
          </div>
        </Motion.div>

        {/* Dynamic Bento Navigation */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Menu Sidebar - Vertical Bento */}
          <aside className="lg:w-1/5">
            <nav className="flex flex-row gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex items-center gap-4 rounded-2xl px-6 py-4 whitespace-nowrap transition-all duration-500 ${
                      isActive
                        ? "bg-brand-500 shadow-brand-500/20 text-white shadow-2xl"
                        : "border border-gray-100 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    />
                    <span className="text-sm font-bold tracking-wide uppercase">
                      {item.label}
                    </span>
                    {isActive && (
                      <Motion.div
                        layoutId="activeGlow"
                        className="bg-brand-500/10 absolute inset-0 rounded-2xl blur-xl"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="min-h-[600px] rounded-[3rem] border border-gray-100 bg-white p-8 shadow-sm md:p-12"
              >
                {activeTab === "overview" && (
                  <HubView user={user} setActiveTab={setActiveTab} />
                )}
                {activeTab === "orders" && <OrderHistory />}
                {activeTab === "addresses" && <Addresses />}
                {activeTab === "payments" && <PaymentMethods />}
                {activeTab === "settings" && <AccountSettings user={user} />}
              </Motion.div>
            </AnimatePresence>
          </main>
        </div>
      </ContainerWrapper>
    </div>
  );
};

const HubView = ({ setActiveTab }) => (
  <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* Large Welcome Bento */}
    <div className="bg-brand-500 shadow-brand-500/10 col-span-1 rounded-[2.5rem] p-8 text-left text-white shadow-xl md:col-span-2">
      <HiSparkles className="mb-6 h-12 w-12 opacity-50" />
      <h2 className="font-heading mb-4 text-5xl">Welcome Back, Alex!</h2>
      <p className="mb-8 text-xl leading-relaxed opacity-80">
        You're just 250 points away from your next free shipping reward.
      </p>
      <Button
        variant="secondary"
        textColor="brand-500"
        className="!text-brand-500 rounded-2xl !bg-white px-8 font-bold shadow-lg"
      >
        Redeem Rewards
      </Button>
    </div>

    {/* Quick Link Bento */}
    <button
      onClick={() => setActiveTab("orders")}
      className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-50/50 p-8 text-left transition-all hover:bg-gray-100"
    >
      <div className="absolute -right-6 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-110">
        <HiShoppingBag className="h-40 w-40" />
      </div>
      <HiShoppingBag className="text-brand-500 mb-4 h-8 w-8" />
      <h3 className="text-2xl font-bold text-gray-900">Latest Orders</h3>
      <p className="mt-2 text-gray-500">Track your pending shipments.</p>
    </button>

    {/* Stats Mosaic */}
    <div className="rounded-[2.5rem] border border-gray-100 bg-gray-50/50 p-8 text-left">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Total Spent
          </p>
          <p className="text-3xl font-bold text-gray-900">$2,450.00</p>
        </div>
        <div className="h-px bg-gray-200" />
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Orders Placed
          </p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>
      </div>
    </div>

    {/* Referral Card */}
    <div className="border-brand-500/10 bg-brand-50/50 col-span-1 flex items-center gap-6 rounded-[2.5rem] border p-8 text-left md:col-span-2">
      <div className="bg-brand-500/10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl">
        <HiGift className="text-brand-500 h-8 w-8" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">Invite Friends</h3>
        <p className="text-sm text-gray-500">
          Give 20% off, get $10 in points.
        </p>
      </div>
      <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
        Share
      </button>
    </div>
  </div>
);

const OrderHistory = () => {
  const orders = [
    {
      id: "ORD-7721",
      date: "Dec 12, 2024",
      total: "$84.00",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-6540",
      date: "Nov 28, 2024",
      total: "$126.50",
      status: "In Transit",
      items: 5,
    },
    {
      id: "ORD-5412",
      date: "Oct 15, 2024",
      total: "$45.20",
      status: "Cancelled",
      items: 2,
    },
  ];

  return (
    <div className="space-y-10 text-left">
      <h2 className="font-heading text-4xl leading-tight text-gray-900">
        Journey History
      </h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-50/50 p-6 transition-all hover:bg-gray-100 md:flex-row"
          >
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
                <HiShoppingBag className="text-brand-500 h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  {order.id}
                </p>
                <p className="text-lg font-bold text-gray-900">{order.date}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center gap-12 md:justify-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Items
                </p>
                <p className="font-bold text-gray-900">{order.items}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Total
                </p>
                <p className="text-brand-500 text-xl font-bold">
                  {order.total}
                </p>
              </div>
            </div>
            <div
              className={`rounded-xl px-4 py-2 text-xs font-bold tracking-widest uppercase ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Addresses = () => {
  const items = [
    {
      id: 1,
      type: "Home Base",
      addr: "123 Maple Street, NY",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work Station",
      addr: "456 Business Ave, BK",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-10 text-left">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-4xl leading-tight text-gray-900">
          Saved Hubs
        </h2>
        <button className="bg-brand-500 shadow-brand-500/20 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-110">
          <HiPlus className="h-6 w-6" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-[2.5rem] border p-8 transition-all ${item.isDefault ? "border-brand-500 bg-brand-50" : "border-gray-100 bg-gray-50/50 hover:bg-gray-100"}`}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                {item.type}
              </span>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-900">
                  <HiPencilSquare className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-xl leading-relaxed font-bold text-gray-900">
              {item.addr}
            </p>
            {item.isDefault && (
              <div className="bg-brand-500/10 text-brand-500 mt-4 inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase">
                Primary Ship-to
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  const cards = [
    {
      id: 1,
      type: "Visa Platinum",
      last4: "4242",
      isDefault: true,
      color: "from-brand-600 to-brand-400",
    },
    {
      id: 2,
      type: "Black Card",
      last4: "8888",
      isDefault: false,
      color: "from-gray-900 to-gray-700",
    },
  ];

  return (
    <div className="space-y-10 text-left">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-4xl leading-tight text-gray-900">
          Wallet
        </h2>
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-900 shadow-sm transition-all hover:bg-gray-50">
          <HiPlus className="h-6 w-6" />
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`group relative h-56 overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${card.color} p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <HiCreditCard className="h-10 w-10 text-white/40" />
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
                  {card.type}
                </span>
              </div>
              <div>
                <p className="mb-1 text-xs text-white/40">Card Number</p>
                <p className="text-2xl font-bold tracking-[0.2em] text-white">
                  •••• •••• •••• {card.last4}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/60">
                  ALEX JOHNSON
                </p>
                {card.isDefault && (
                  <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountSettings = ({ user }) => (
  <div className="space-y-10 text-left">
    <h2 className="font-heading text-4xl leading-tight text-gray-900">
      System Config
    </h2>
    <form className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="group">
          <label className="group-focus-within:text-brand-500 mb-2 block text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors">
            Full Name
          </label>
          <div className="focus-within:border-brand-500/50 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 transition-all focus-within:bg-white focus-within:shadow-sm">
            <HiUser className="h-5 w-5 text-gray-300" />
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
            />
          </div>
        </div>
        <div className="group">
          <label className="group-focus-within:text-brand-500 mb-2 block text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors">
            Secure Email
          </label>
          <div className="focus-within:border-brand-500/50 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 transition-all focus-within:bg-white focus-within:shadow-sm">
            <HiEnvelope className="h-5 w-5 text-gray-300" />
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
            />
          </div>
        </div>
        <div className="group">
          <label className="group-focus-within:text-brand-500 mb-2 block text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors">
            Phone Line
          </label>
          <div className="focus-within:border-brand-500/50 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 transition-all focus-within:bg-white focus-within:shadow-sm">
            <HiPhone className="h-5 w-5 text-gray-300" />
            <input
              type="tel"
              defaultValue={user?.phone}
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2.5rem] border border-gray-100 bg-gray-50/50 p-8">
          <h3 className="mb-6 text-lg font-bold text-gray-900">Update Key</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="focus:border-brand-500/50 w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-900 transition-all outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="focus:border-brand-500/50 w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-900 transition-all outline-none"
            />
          </div>
          <button className="bg-brand-500 shadow-brand-500/20 mt-8 w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95">
            Save Config
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default Profile;
