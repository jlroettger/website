import React from "react";
import {CustomLink} from "../mdx-components";

export default function Box({ctaLink, ctaText, price, title, features, isFeatured}) {
    const wrapperClass = `pt-12 pb-8 px-8 border rounded-xl lg:text-center ${isFeatured ? 'bg-gray-300' : 'bg-gray-400'}`;
    const ctaClass = `block py-4 text-sm text-center font-medium leading-normal ${isFeatured ? 'bg-gray-200 hover:bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'} rounded transition duration-200`;
    return (
        <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-0 min-h-3">
            <div className={wrapperClass}>
                <h3 className="mb-6 font-medium">{title}</h3>
                <div className="flex lg:justify-center mb-8">
                    <span className="self-start inline-block mr-1 text-5xl font-semibold text-gray-500">$</span>
                    <span className="self-end text-5xl font-semibold font-heading">{price}</span>
                    {price > 0 ? <span className="self-end text-xl font-semibold font-heading">/ month</span> : null}
                </div>
                <ul className="mb-6 text-left">
                    {features.map(feature => <Item feature={feature}/>)}
                </ul>
                <a className={ctaClass} href={ctaLink}>{ctaText}</a>
            </div>
        </div>
    );
}

function Item({feature}) {
    return (
        <li className="flex items-center py-4">
            <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                      fill="#2B2D30"></path>
            </svg>
            {feature.link != null ? <CustomLink href={feature.link}>{feature.name}</CustomLink> : <p className="font-medium">{feature.name}</p>}
        </li>
    );
}