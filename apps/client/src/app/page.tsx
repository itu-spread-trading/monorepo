import Chart from '@/assets/landing/chart.png';
import Vector from '@/assets/landing/vector.png';
import Logo from '@/assets/logo.png';
import { Button } from '@/components';
import { SpreadSDK } from '@ituspreadtrading/spread-sdk';
import { DashboardIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const spread = new SpreadSDK();

export default function Home(): ReactNode {
    return (
        <>
            <div className="container flex flex-row align-center justify-between pt-4 pb-4">
                <Image src={Logo} alt="Spread Icon" className="w-[100px]" />
                <Button size="lg">
                    <DashboardIcon className="mr-1" /> Launch App
                </Button>
            </div>
            <div className="container min-h-[calc(100vh-72px)] pt-[120px] items-center flex flex-col">
                <h1 className="text-6xl max-w-[100%] md:max-w-[70%] lg:max-w-[50%] leading-normal font-semibold text-center">
                    Explore Spread Trading with Blockchain Assets
                    <Image
                        src={Vector}
                        alt="Landing Vector Line"
                        className="w-[50%] m-auto"
                    />
                </h1>

                <p className="max-w-[100%] md:max-w-[70%] lg:max-w-[50%] text-center mt-8 text-gray-400">
                    Step into the world of trading excellence and seize every
                    opportunity with our advanced platform, expert guidance, and
                    strategic insights for unrivaled financial success.
                </p>
                <div className="mt-10 flex space-x-4">
                    <Button size="lg">
                        <DashboardIcon className="mr-2" /> Launch App
                    </Button>
                    <Link
                        href="https://github.com/itu-spread-trading"
                        target="_blank"
                    >
                        <Button variant="outline" size="lg">
                            <GitHubLogoIcon className="mr-2" /> Github
                        </Button>
                    </Link>
                </div>

                <Image
                    src={Chart}
                    alt="Trading Chart"
                    className="w-full h-[100%] mt-16 lg:mt-32"
                />
            </div>
        </>
    );
}
