import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { StorefrontShell } from "./StorefrontShell";
import type { StoreAddress } from "@/storefront";

type AccountFormState = {
  name: string;
  phone: string;
  address: StoreAddress;
};

const blankAddress = (email = ""): StoreAddress => ({
  fullName: "",
  email,
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
});

export default function Account() {
  const { user, loading, signOut, updateAccountProfile } = useAuth();
  const [form, setForm] = useState<AccountFormState>({
    name: "",
    phone: "",
    address: blankAddress(),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.defaultAddress || blankAddress(user.email),
    });
  }, [user]);

  if (loading) {
    return (
      <StorefrontShell title="Account" intro="Loading account session..." backHref="/shop" backLabel="Back to shop">
        <div className="border border-border p-6 text-sm text-muted-foreground">Checking local session state.</div>
      </StorefrontShell>
    );
  }

  if (!user) {
    return (
      <StorefrontShell
        title="Account"
        intro="Sign in to view your profile, shipping address, and order history."
        backHref="/shop"
        backLabel="Back to shop"
      >
        <div className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-sm text-foreground/80">
              The local backend already supports account sessions. Use the login page to continue.
            </p>
          </div>
          <div className="pt-6">
            <Button asChild className="text-xs uppercase tracking-widest">
              <Link to="/login">Go to login</Link>
            </Button>
          </div>
        </div>
      </StorefrontShell>
    );
  }

  const updateField = (field: keyof AccountFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateAddressField = (field: keyof StoreAddress, value: string) => {
    setForm((current) => ({
      ...current,
      address: {
        ...current.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      await updateAccountProfile({
        name: form.name.trim(),
        phone: form.phone.trim(),
        defaultAddress: {
          ...form.address,
          fullName: form.address.fullName.trim() || form.name.trim(),
          email: user.email,
          phone: form.address.phone.trim() || form.phone.trim(),
        },
      });
      setMessage("Account updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <StorefrontShell
      title="Account"
      intro="Edit your customer profile, saved shipping address, and order history from the local backend."
      backHref="/shop"
      backLabel="Back to shop"
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={handleSubmit} className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Profile</p>
          </div>
          <div className="space-y-4 py-6">
            <Input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Name"
              autoComplete="name"
              required
            />
            <Input
              value={user.email}
              disabled
              placeholder="Email"
              className="opacity-80"
            />
            <Input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Phone"
              autoComplete="tel"
            />
          </div>

          <div className="border-b border-t border-border py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Address</p>
          </div>
          <div className="grid gap-4 py-6 md:grid-cols-2">
            <Input
              value={form.address.fullName}
              onChange={(event) => updateAddressField("fullName", event.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="md:col-span-2"
            />
            <Input
              value={form.address.line1}
              onChange={(event) => updateAddressField("line1", event.target.value)}
              placeholder="Address line 1"
              autoComplete="address-line1"
              className="md:col-span-2"
            />
            <Input
              value={form.address.line2}
              onChange={(event) => updateAddressField("line2", event.target.value)}
              placeholder="Address line 2"
              autoComplete="address-line2"
              className="md:col-span-2"
            />
            <Input
              value={form.address.city}
              onChange={(event) => updateAddressField("city", event.target.value)}
              placeholder="City"
              autoComplete="address-level2"
            />
            <Input
              value={form.address.state}
              onChange={(event) => updateAddressField("state", event.target.value)}
              placeholder="State"
              autoComplete="address-level1"
            />
            <Input
              value={form.address.postalCode}
              onChange={(event) => updateAddressField("postalCode", event.target.value)}
              placeholder="Postal code"
              autoComplete="postal-code"
            />
            <Input
              value={form.address.country}
              onChange={(event) => updateAddressField("country", event.target.value)}
              placeholder="Country"
              autoComplete="country"
            />
            <Input
              value={form.address.phone}
              onChange={(event) => updateAddressField("phone", event.target.value)}
              placeholder="Address phone"
              autoComplete="tel"
              className="md:col-span-2"
            />
          </div>

          {error ? <p className="pb-4 text-sm text-destructive">{error}</p> : null}
          {message ? <p className="pb-4 text-sm text-muted-foreground">{message}</p> : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={saving} className="text-xs uppercase tracking-widest">
              {saving ? "Saving..." : "Save account"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void signOut()}
              className="text-xs uppercase tracking-widest"
            >
              Sign Out
            </Button>
          </div>
        </form>

        <div className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order History</p>
          </div>
          <div className="py-6">
            <p className="text-sm text-foreground/80">
              View your purchase history, shipment status, and tracking details from the account order pages.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="text-xs uppercase tracking-widest">
                <Link to="/account/orders">View orders</Link>
              </Button>
              <Button asChild variant="outline" className="text-xs uppercase tracking-widest">
                <Link to="/track-order">Track order</Link>
              </Button>
            </div>
          </div>

          <div className="border-y border-border py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Current Session</p>
            <p className="mt-2 text-sm text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="py-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Saved Address</p>
            <div className="mt-3 space-y-1 text-sm text-foreground">
              <p>{form.address.fullName || user.name}</p>
              <p>{form.address.line1}</p>
              {form.address.line2 ? <p>{form.address.line2}</p> : null}
              <p>
                {form.address.city}
                {form.address.city && form.address.state ? ", " : ""}
                {form.address.state} {form.address.postalCode}
              </p>
              <p>{form.address.country}</p>
            </div>
          </div>
        </div>
      </div>
    </StorefrontShell>
  );
}
