import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title: string;
    rightEl?: ReactNode;
};

export const Graph = ({ children, title, rightEl }: Props) => {
    return (
        <div className="p-4 rounded-lg border-neutral-900 border-8">
            <div className="flex justify-between mb-3">
                <h2 className="text-2xl text-neutral-300 font-bold">{title}</h2>
                {rightEl != null ? rightEl : null}
            </div>
            {children}
        </div>
    );
};
