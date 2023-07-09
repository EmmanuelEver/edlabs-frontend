import { FC } from "react"

type LangTypes = "python" | "c" | "js"

interface IProps {
    lang: LangTypes,
    size?: string
}
const ProglangLogo: FC<IProps> = ({ lang, size = "36" }) => {

    switch (lang) {
        case "python":

            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="#0277BD"
                        d="M24.047 5c-1.555.005-2.633.142-3.936.367-3.848.67-4.549 2.077-4.549 4.67V14h9v2H10.87c-2.636 0-4.943 1.242-5.674 4.219-.826 3.417-.863 5.557 0 9.125C5.851 32.005 7.294 34 9.931 34h3.632v-5.104c0-2.966 2.686-5.896 5.764-5.896h7.236c2.523 0 5-1.862 5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672.061-.006-1.756-.371-3.298-.365zm-4.984 4c.821 0 1.5.677 1.5 1.502a1.5 1.5 0 01-1.5 1.498 1.49 1.49 0 01-1.5-1.498A1.5 1.5 0 0119.063 9z"
                    ></path>
                    <path
                        fill="#FFC107"
                        d="M23.078 43c1.555-.005 2.633-.142 3.936-.367 3.848-.67 4.549-2.077 4.549-4.67V34h-9v-2h13.693c2.636 0 4.943-1.242 5.674-4.219.826-3.417.863-5.557 0-9.125C41.274 15.995 39.831 14 37.194 14h-3.632v5.104c0 2.966-2.686 5.896-5.764 5.896h-7.236c-2.523 0-5 1.862-5 4.377v8.586c0 2.439 1.759 4.263 4.218 4.672-.061.006 1.756.371 3.298.365zm4.985-4c-.821 0-1.5-.677-1.5-1.502a1.5 1.5 0 011.5-1.498c.837 0 1.5.664 1.5 1.498 0 .822-.664 1.502-1.5 1.502z"
                    ></path>
                </svg>
            )

        case "c":
            return (
                <svg
                    width={size}
                    height={size}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 48 48"
                >
                    <linearGradient
                        id="9nBOzQEsA2vJDj4A8wbora"
                        x1="22.48"
                        x2="31.833"
                        y1="19.823"
                        y2="45.52"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#3940a4"></stop>
                        <stop offset="1" stopColor="#293091"></stop>
                    </linearGradient>
                    <path
                        fill="url(#9nBOzQEsA2vJDj4A8wbora)"
                        d="M22.903 3.286a2.247 2.247 0 012.193 0l16.807 9.434A2.12 2.12 0 0143 14.566v18.867c0 .762-.418 1.466-1.097 1.847l-16.807 9.434a2.247 2.247 0 01-2.193 0L6.096 35.28A2.122 2.122 0 015 33.434V14.567c0-.762.418-1.466 1.097-1.847l16.806-9.434z"
                    ></path>
                    <linearGradient
                        id="9nBOzQEsA2vJDj4A8wborb"
                        x1="16.43"
                        x2="26.687"
                        y1="3.382"
                        y2="31.562"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#7b83eb"></stop>
                        <stop offset="1" stopColor="#5961c3"></stop>
                    </linearGradient>
                    <path
                        fill="url(#9nBOzQEsA2vJDj4A8wborb)"
                        d="M5.304 34.404C5.038 34.048 5 33.71 5 33.255V14.496c0-.758.417-1.458 1.094-1.836l16.748-9.38c.677-.379 1.594-.371 2.271.008 3.343 1.872 13.371 7.459 16.714 9.331.27.152.476.335.66.576L5.304 34.404z"
                    ></path>
                    <path
                        fill="#fff"
                        d="M24 10c7.727 0 14 6.273 14 14s-6.273 14-14 14-14-6.273-14-14 6.273-14 14-14zm0 7c3.863 0 7 3.136 7 7 0 3.863-3.137 7-7 7s-7-3.137-7-7c0-3.864 3.136-7 7-7z"
                    ></path>
                    <linearGradient
                        id="9nBOzQEsA2vJDj4A8wborc"
                        x1="31.031"
                        x2="39.734"
                        y1="12.865"
                        y2="36.777"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#5c65d6"></stop>
                        <stop offset="0.999" stopColor="#464eb0"></stop>
                    </linearGradient>
                    <path
                        fill="url(#9nBOzQEsA2vJDj4A8wborc)"
                        d="M42.485 13.205c.516.483.506 1.211.506 1.784 0 3.795-.032 14.589.009 18.384.004.396-.127.813-.323 1.127L23.593 24l18.892-10.795z"
                    ></path>
                    <path
                        d="M24 10c5.128 0 9.602 2.771 12.041 6.887l-6.073 3.47A6.993 6.993 0 0024 17c-3.864 0-7 3.136-7 7 0 3.863 3.137 7 7 7a6.991 6.991 0 006.029-3.459l6.132 3.374C33.75 35.142 29.21 38 24 38c-7.727 0-14-6.273-14-14s6.273-14 14-14m0-1C15.729 9 9 15.729 9 24s6.729 15 15 15c5.367 0 10.36-2.908 13.03-7.59l.503-.882-.89-.49-6.132-3.374-.851-.468-.493.837A6.025 6.025 0 0124 30c-3.308 0-6-2.692-6-6s2.692-6 6-6a5.963 5.963 0 015.115 2.879l.507.828.842-.481 6.073-3.47.882-.504-.518-.874C34.205 11.827 29.262 9 24 9z"
                        opacity="0.05"
                    ></path>
                    <path
                        d="M24 10c5.128 0 9.602 2.771 12.041 6.887l-6.073 3.47A6.993 6.993 0 0024 17c-3.864 0-7 3.136-7 7 0 3.863 3.137 7 7 7a6.991 6.991 0 006.029-3.459l6.132 3.374C33.75 35.142 29.21 38 24 38c-7.727 0-14-6.273-14-14s6.273-14 14-14m0-.5C16.005 9.5 9.5 16.005 9.5 24S16.005 38.5 24 38.5c5.188 0 10.014-2.812 12.595-7.337l.252-.441-.445-.245-6.132-3.374-.425-.234-.246.418A6.531 6.531 0 0124 30.5c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5a6.462 6.462 0 015.542 3.118l.253.414.421-.241 6.073-3.47.441-.252-.259-.437C33.864 12.233 29.086 9.5 24 9.5z"
                        opacity="0.07"
                    ></path>
                </svg>
            )
        case "js":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 48 48"
                >
                    <path fill="#ffd600" d="M6 42V6h36v36H6z"></path>
                    <path
                        fill="#000001"
                        d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368l2.538-1.685zm-11.586.082c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368l2.619-1.603z"
                    ></path>
                </svg>
            )
        default:
            return <></>;
    }
}

export default ProglangLogo