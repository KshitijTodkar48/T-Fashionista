export const Hero = () => {
    return (
        <section className="max-w-[1335px] px-10 flex flex-col lg:flex-row items-center justify-center gap-10">
            <div className="flex flex-col w-full lg:w-[45%] items-center justify-center">
                <h1 className="flex flex-col gap-3">
                   <div className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Slay the Street with</div>
                   <div className="font-bold flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                    <div><span className="text-orange-500"> T-Fashionista</span>'s</div> <div> Hottest </div>
                   </div>
                   <span className=" font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">T-Shirt Styles !</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-lg text-gray-400 font-semibold mt-5 px-2 sm:px-20 md:max-lg:w-[680px] lg:p-0">Show off your personality with our unique T-shirt styles that are perfect for self-expression. Whether you're a trendsetter, a minimalist, or a fashion enthusiast, T-Fashionista's collection has something for everyone.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <img className="w-[250px] h-[400px] xl:w-[315px] xl:h-[500px] rounded-xl" 
                src="https://img.mensxp.com/media/shop/catalog/products/N/718146/navy-blue-and-orange-colorblocked-cotton-half-sleeve-t-shirt-273616-default.jpg" alt="" />
                <img className="w-[250px] h-[400px] xl:w-[315px] xl:h-[500px] rounded-xl"
                src="https://i.pinimg.com/originals/63/66/ae/6366ae326c5d497cc73ce0876c34efa5.jpg" alt="" />
            </div>
        </section>
    )
}