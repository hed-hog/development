import { createBrowserRouter, RouteObject } from "react-router-dom";
import GeneralError from "./pages/errors/general-error.tsx";
import MaintenanceError from "./pages/errors/maintenance-error.tsx";
import NotFoundError from "./pages/errors/not-found-error.tsx";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const routes = [
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("./pages/auth/login.tsx")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("./pages/auth/forgot-password.tsx")).default,
    }),
  },
  {
    path: "/email-sent",
    lazy: async () => ({
      Component: (await import("./pages/auth/email-sent.tsx")).default,
    }),
  },
  {
    path: "/password-recovery/:code",
    lazy: async () => ({
      Component: (await import("./pages/auth/password-recovery.tsx")).default,
    }),
  },
  {
    path: "/otp",
    lazy: async () => ({
      Component: (await import("./pages/auth/otp.tsx")).default,
    }),
  },
  {
    path: "/tests",
    lazy: async () => ({
      Component: (await import("./components/custom/color-theme.tsx")).default,
    }),
  },

  // Main route
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app/app-shell.tsx");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/index.tsx")).default,
        }),
      },
      {
        path: "/category",
        lazy: async () => ({
          Component: (await import("./pages/category/category/index.tsx"))
            .default,
        }),
      },
      {
        path: "chats",
        lazy: async () => ({
          Component: (await import("./pages/chat/chat-room/index.tsx")).default,
        }),
      },
      {
        path: "contact",
        children: [
          {
            path: "person",
            lazy: async () => ({
              Component: (await import("./pages/contact/person/index.tsx"))
                .default,
            }),
          },
        ],
      },
      {
        path: "contact-us",
        lazy: async () => ({
          Component: (await import("./pages/contact-us/contact-us/index.tsx"))
            .default,
        }),
      },
      {
        path: "content",
        lazy: async () => ({
          Component: (await import("./pages/content/content/index.tsx"))
            .default,
        }),
      },
      {
        path: "faq",
        lazy: async () => ({
          Component: (await import("./pages/faq/faq/index.tsx")).default,
        }),
      },
      {
        path: "item",
        lazy: async () => ({
          Component: (await import("./pages/payment/item/index.tsx")).default,
        }),
      },
      {
        path: "management",
        children: [
          {
            path: "",
            lazy: async () => ({
              Component: (await import("./pages/management/index.tsx")).default,
            }),
          },
          {
            path: "appearance",
            lazy: async () => ({
              Component: (
                await import("./pages/management/appearance/index.tsx")
              ).default,
            }),
          },
          {
            path: "dashboard",
            lazy: async () => ({
              Component: (
                await import("./pages/management/dashboard/dashboard/index.tsx")
              ).default,
            }),
          },
          {
            path: "dashboard-component",
            lazy: async () => ({
              Component: (
                await import(
                  "./pages/management/dashboard/dashboard-component/index.tsx"
                )
              ).default,
            }),
          },
          {
            path: "dashboard-item",
            lazy: async () => ({
              Component: (
                await import(
                  "./pages/management/dashboard/dashboard-item/index.tsx"
                )
              ).default,
            }),
          },
          {
            path: "dashboard-user",
            lazy: async () => ({
              Component: (
                await import(
                  "./pages/management/dashboard/dashboard-user/index.tsx"
                )
              ).default,
            }),
          },
          {
            path: "mail-manager",
            children: [
              {
                path: "mail",
                lazy: async () => ({
                  Component: (
                    await import("./pages/mail-manager/mail/index.tsx")
                  ).default,
                }),
              },
              {
                path: "mail-sent",
                lazy: async () => ({
                  Component: (
                    await import("./pages/mail-manager/mail-sent/index.tsx")
                  ).default,
                }),
              },
            ],
          },
          {
            path: "menu",
            lazy: async () => ({
              Component: (await import("./pages/management/menu/index.tsx"))
                .default,
            }),
          },
          {
            path: "pages",
            children: [
              {
                path: "component",
                lazy: async () => ({
                  Component: (await import("./pages/page/component/index.tsx"))
                    .default,
                }),
              },
              {
                path: "component-prop",
                lazy: async () => ({
                  Component: (
                    await import("./pages/page/component-prop/index.tsx")
                  ).default,
                }),
              },
              {
                path: "component-prop-type",
                lazy: async () => ({
                  Component: (
                    await import("./pages/page/component-prop-type/index.tsx")
                  ).default,
                }),
              },
              {
                path: "component-type",
                lazy: async () => ({
                  Component: (
                    await import("./pages/page/component-type/index.tsx")
                  ).default,
                }),
              },
            ],
          },
          {
            path: "payment",
            children: [
              {
                path: "discount-type",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/discount-type/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "item",
                lazy: async () => ({
                  Component: (
                    await import("./pages/management/payment/item/index.tsx")
                  ).default,
                }),
              },
              {
                path: "payment-card-brand",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/payment-card-brand/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "payment-gateway",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/payment-gateway/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "payment-method",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/payment-method/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "payment-notification",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/payment-notification/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "payment-status",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/payment/payment-status/index.tsx"
                    )
                  ).default,
                }),
              },
            ],
          },
          {
            path: "person",
            children: [
              {
                path: "person-address-type",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/contact/person-address-type/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "person-contact-type",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/contact/person-contact-type/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "person-custom-type",
                lazy: async () => ({
                  Component: (
                    await import("./pages/contact/person-custom-type/index.tsx")
                  ).default,
                }),
              },
              {
                path: "person-document-type",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/contact/person-document-type/index.tsx"
                    )
                  ).default,
                }),
              },
              {
                path: "person-type",
                lazy: async () => ({
                  Component: (
                    await import("./pages/contact/person-type/index.tsx")
                  ).default,
                }),
              },
            ],
          },
          {
            path: "role",
            lazy: async () => ({
              Component: (await import("./pages/management/role/index.tsx"))
                .default,
            }),
          },
          {
            path: "route",
            lazy: async () => ({
              Component: (await import("./pages/management/route/index.tsx"))
                .default,
            }),
          },
          {
            path: "screen",
            lazy: async () => ({
              Component: (await import("./pages/management/screen/index.tsx"))
                .default,
            }),
          },
          {
            path: "setting",
            children: [
              {
                path: "",
                lazy: async () => ({
                  Component: (
                    await import("./pages/management/setting/index.tsx")
                  ).default,
                }),
              },
              {
                path: ":slug",
                lazy: async () => ({
                  Component: (
                    await import("./pages/management/setting/forms.tsx")
                  ).default,
                }),
              },
            ],
          },
          {
            path: "subscription",
            children: [
              {
                path: "subscription-plan",
                lazy: async () => ({
                  Component: (
                    await import(
                      "./pages/management/subscription/subscription-plan/index.tsx"
                    )
                  ).default,
                }),
              },
            ],
          },
          {
            path: "user",
            lazy: async () => ({
              Component: (await import("./pages/management/user/index.tsx"))
                .default,
            }),
          },
        ],
      },
      {
        path: "pages",
        lazy: async () => ({
          Component: (await import("./pages/page/instance/index.tsx")).default,
        }),
      },
      {
        path: "payment",
        lazy: async () => ({
          Component: (await import("./pages/payment/payment/index.tsx"))
            .default,
        }),
      },
      {
        path: "payment-coupon",
        lazy: async () => ({
          Component: (await import("./pages/payment-coupon/index.tsx")).default,
        }),
      },
      {
        path: "rating",
        lazy: async () => ({
          Component: (await import("./pages/rating/rating/index.tsx")).default,
        }),
      },
      {
        path: "subscription",
        children: [
          {
            path: "",
            lazy: async () => ({
              Component: (
                await import("./pages/subscription/subscription/index.tsx")
              ).default,
            }),
          },
        ],
      },
      {
        path: "tag",
        lazy: async () => ({
          Component: (await import("./pages/tag/tag/index.tsx")).default,
        }),
      },
      {
        path: "wallet",
        lazy: async () => ({
          Component: (await import("./pages/wallet/wallet/index.tsx")).default,
        }),
      },
    ],
  },

  // Error route
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
];

const router = createBrowserRouter(routes as RouteObject[]);

export default router;
