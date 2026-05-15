"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type BenchmarkPoint = { metric: string; classical: number; simulatedHybrid: number };

export function BenchmarkChart({ data }: { data: BenchmarkPoint[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: -12, bottom: 40 }}>
          <CartesianGrid stroke="rgba(14,107,168,0.10)" vertical={false} />
          <XAxis dataKey="metric" interval={0} angle={-18} textAnchor="end" tick={{ fill: "#0B3D6B", fontSize: 11 }} tickLine={false} />
          <YAxis tick={{ fill: "#0B3D6B", fontSize: 12 }} tickLine={false} domain={[0, 100]} />
          <Tooltip
            cursor={{ fill: "rgba(63,182,224,0.08)" }}
            contentStyle={{
              border: "1px solid rgba(63,182,224,0.30)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.94)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 18px 50px rgba(11,61,107,0.25)"
            }}
          />
          <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
          <Bar dataKey="classical" name="Classical baseline" fill="#5E8FB5" radius={[8, 8, 0, 0]} />
          <Bar dataKey="simulatedHybrid" name="Prototype scoring layer" fill="#3FB6E0" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
