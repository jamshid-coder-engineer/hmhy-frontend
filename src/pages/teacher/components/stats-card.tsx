import { Card } from "../../..//components/ui/card";
import type { StatsCardProps } from "../../auth/admin-type";

export const StatsCard = ({
    label,
    value,
    icon: Icon,
    iconColor,
    labelColor,
}: StatsCardProps) => (
    <Card className="flex items-center justify-between p-6 bg-white border-none shadow-sm">
        <div className="space-y-1">
            <p className={`text-xs font-semibold uppercase ${labelColor}`}>
                {label}
            </p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon className="w-6 h-6" />
        </div>
    </Card>
);
