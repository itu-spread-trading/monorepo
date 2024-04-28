import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title: string;
    rightEl?: ReactNode;
};

export const Graph = ({ children, title, rightEl }: Props) => {
    return (
        <div className="p-4 rounded-lg border-neutral-700 border-2">
            <div className="flex justify-between mb-3">
                <h2 className="text-xl">{title}</h2>
                {rightEl != null ? rightEl : null}
            </div>
            {children}
        </div>
    );
};
