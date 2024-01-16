import { SlideProps } from "@/types/types"
export const Slide: React.FC<SlideProps> = ({ id, title }) => {
    return (
        <div className={`lg:min-h-[800px]  h-[500px] slide${id} flex items-center justify-center`}>
            <h1 className="text-white font-semibold text-center max-w-[1000px] mx-auto text-[31px]  lg:text-[80px] leading-[110%]">{title}</h1>
        </div>
    )
}