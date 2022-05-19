import "pinia";
declare module "pinia" {
  export interface PiniaCustomProperties {
    set secret(value: string | Ref<string>);
    get secret(): string;
  }
}
