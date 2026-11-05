// The `.vue` files of the demo are compiled by Vite: for TypeScript, a component is what Vue says it is.
declare module "*.vue" {
    import type {DefineComponent} from "vue"

    const component: DefineComponent<object, object, unknown>
    export default component
}
