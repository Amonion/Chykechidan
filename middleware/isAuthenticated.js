export default function ({ store, redirect, route }) {
  const protectedRoutes = "customer";
  const path = route.name;

  store.commit("hideNav");
  store.commit("SET_ROUTE", path);

  if (!store.state.auth.loggedIn) {
    if (path.includes("admin") || path.includes(protectedRoutes)) {
      return redirect("/login");
    }
  } else if (path.includes("admin")) {
    store.commit("admin/HIDE_NAV");
  }

  // if (store.state.auth.loggedIn) {
  //   const path = route.name;
  //   let redirectAdmin = false;
  //   if (
  //     path.includes(protectedRoutes) &&
  //     store.state.auth.user.status == "Admin"
  //   ) {
  //     redirectAdmin = true;
  //   }
  //   if (redirectAdmin) {
  //     return redirect("/admin");
  //   }

  //   if (path.includes("admin") && store.state.auth.user.status == "User") {
  //     return redirect("/dashboard");
  //   }

  //   if (
  //     path == "signup" ||
  //     (path == "login" && store.state.auth.user.status == "User")
  //   ) {
  //     return redirect("/dashboard");
  //   }
  // }
}
