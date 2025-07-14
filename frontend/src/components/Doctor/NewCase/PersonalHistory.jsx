import Scribble from '../Scribble';

const PersonalHistory = ({complaint}) => {
    const historyArray = ["Desire", "Aversion", "Appetite", "Thirst", "Stool", "Urine", "Sleep", "Dreams", "Menstrual History", "Obstetric History", "Sexual History"];

    return (
        <div>
            <h1 className='sm:text-xl bg-blue-400 text-white text-lg font-semibold text-center py-2'>Frequently Asked Questions</h1>
            <div className='flex flex-col items-center'>
                {
                    historyArray.map((history, index) => (
                        <div className='bg-blue-200 border-b w-full'>
                            <p className='font-semibold py-3 text-center '>{index + 1}. {history}</p>
                        </div>
                    ))

                }
            </div>
            <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Add {complaint}</h1>
             <Scribble complaint={complaint}/>
        </div>
    )
}

export default PersonalHistory