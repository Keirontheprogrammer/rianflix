export default function LoadingSpinner({ size =24 }: { size?: number }){
    return (
        <div className="flex items-center justify-center w-full py-12">
            <div
                className="border-2 border-brand-border border-t-brand-orange rounded-full animate-spin"
                style={{ width: size, height: size }}
            >
            </div>

        </div>
    )
}