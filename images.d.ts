declare module "*.PNG" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "*.png" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "*.jpg" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/asset/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "../asset/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/public/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}
