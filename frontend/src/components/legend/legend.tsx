import dietary from "@/data/dietary";

const Legend = () => {
  return (
    <div className="px-6 py-8">
      <p className="text-reats-blue-200 mb-6 text-2xl font-semibold">
        Icon Legend
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Object.entries(dietary).map(([key, cfg]) => {
          const Icon = cfg.icon as React.ComponentType<{ className?: string }>;
          return (
            <div
              key={key}
              className="border-reats-blue-100 flex items-center gap-4 rounded-xl border-1 p-3"
            >
              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${cfg.color}`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{cfg.label}</span>
              </div>
              <div>
                <div className="font-medium">{key}</div>
                <div className="text-muted-foreground text-sm">{cfg.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
