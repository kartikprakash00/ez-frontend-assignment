import React from 'react';

const usps = [
    {
        title: 'Consistently High Quality',
        icon: '⭐️⭐️⭐️⭐️⭐️',
        description: 'Technology has brought us to the threshold of a variety of high-quality services. However, as a team of ex-consultants from top consulting firms, we have constantly found...',
        link: '/articles/quality'
    },
    {
        title: 'Round the Clock Availability',
        icon: '⏰',
        description: 'We are available 24/7 to handle your requests and assignments.',
        link: '/articles/availability'
    },
    {
        title: 'Faster than the Fastest',
        icon: '🏃‍♂️💨',
        description: 'Our team ensures the fastest turnaround times without compromising quality.',
        link: '/articles/speed'
    },
    {
        title: 'Information Security',
        icon: '🔒',
        description: 'We adhere to ISO-certified standards to keep your information safe.',
        link: '/articles/security'
    },
];

const USPSection = () => {
    return (
        <div className="w-full bg-[#f5f7fb] py-12 px-4 md:px-16 flex flex-col-reverse md:flex-row gap-16 md:gap-24 items-start justify-center">

            {/* Left Static Timeline */}
            <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-3xl font-bold text-[#0F1C3F] mb-12 leading-tight">
                    Work starts within 30 minutes of your Request Round the Clock!
                </h2>

                <div className="relative flex flex-col gap-16 pl-12">
                    {/* Vertical Line */}
                    <div className="absolute left-[55px] top-9 bottom-0 w-0.5 bg-[#0F1C3F] h-[320px]"></div>

                    {/* Timeline Items */}
                    {[
                        { time: '10', text: 'Acknowledge Request' },
                        { time: '20', text: 'Allocate Experts' },
                        { time: '30', text: 'Begin Assignment' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6 w-full">
                            {/* Dot */}
                            <div className="w-4 h-4 bg-[#0F1C3F] rounded-full shrink-0"></div>

                            {/* Text Row */}
                            <div className="flex justify-between items-center w-full">
                                <p className="text-3xl font-bold text-[#0F1C3F]">
                                    {item.time}
                                    <span className="text-sm"> minutes</span>
                                </p>
                                <p className="text-[#0F1C3F] bg-slate-300 px-10 py-5 max-w-44 rounded-lg text-center">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right USP Cards */}
            <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {usps.map((usp, idx) => (
                    <div key={idx} className="group perspective">
                        <div className="flip-card">
                            <div className="flip-card-inner group-hover:rotate-y-180">
                                {/* Front */}
                                <div className="flip-card-front">
                                    <div className="flex flex-col items-center justify-center h-full p-6">
                                        <div className="text-4xl mb-4">{usp.icon}</div>
                                        <h3 className="text-xl font-bold text-center">{usp.title}</h3>
                                    </div>
                                </div>
                                {/* Back */}
                                <div className="flip-card-back">
                                    <div className="flex flex-col items-center justify-center h-full p-6">
                                        <h3 className="text-xl font-bold text-center pb-5">{usp.title}</h3>
                                        <p className="text-sm mb-4">{usp.description}</p>
                                        <button
                                            onClick={() => window.location.href = usp.link}
                                            className="mt-2 px-4 py-2 bg-[#EA7B2C] text-white rounded hover:bg-orange-600 text-sm"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
};

export default USPSection;