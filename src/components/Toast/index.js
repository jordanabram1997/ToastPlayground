export * from "./Toast";
export { default } from "./Toast";

function Toast({ variant, children}) {
    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            {children}
        </div>
    )
}