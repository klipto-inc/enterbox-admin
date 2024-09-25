declare module "grapesjs-tailwind";

declare module "grapesjs-tabs";

declare module "grapesjs-project-manager";

declare module "grapesjs-templates";

declare module "grapesjs-uppy";

declare module "grapesjs-template-manager";

declare module "grapesjs-indexeddb-ui";

declare module "react-beautiful-dnd";

declare module "grapesjs-click";

declare module "@heroicons/react/outline";

declare module "react-form-builder2";

declare module "@types/google.maps";

declare module "gender-detection";

declare module "@shadcn/ui";

export * from "./zod";

export * from "./types";

declare module "reactjs-social-login" {
  // Here, you can define more specific types if you have the details.
  const LoginSocialGoogle: any;
  const LoginSocialAmazon: any;
  const LoginSocialFacebook: any;
  const LoginSocialGithub: any;
  const LoginSocialInstagram: any;
  const LoginSocialLinkedin: any;
  const LoginSocialMicrosoft: any;
  const LoginSocialPinterest: any;
  const LoginSocialTwitter: any;
  const LoginSocialApple: any;
  const IResolveParams: any;

  export {
    LoginSocialGoogle,
    LoginSocialAmazon,
    LoginSocialFacebook,
    LoginSocialGithub,
    LoginSocialInstagram,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    LoginSocialPinterest,
    LoginSocialTwitter,
    LoginSocialApple,
    IResolveParams,
  };
}
