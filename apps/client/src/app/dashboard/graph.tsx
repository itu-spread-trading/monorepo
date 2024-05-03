import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title: string;
    rightEl?: ReactNode;
};

export const Graph = ({ children, title, rightEl }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <h2 className="text-2xl text-neutral-300 font-bold">{title}</h2>
                {rightEl != null ? rightEl : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
