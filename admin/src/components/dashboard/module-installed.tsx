import { Package } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApp } from "@/hooks/use-app";
import { DashboardDefaultData } from "@/types";

const ModuleInstalled = () => {
  const { request } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<DashboardDefaultData>({
    os: {
      name: "",
      platform: "",
      version: "",
      architecture: "",
      uptime: 0,
      cpu: {
        model: "",
        speed: 0,
        physicalCores: 0,
        virtualCores: 0,
      },
      memory: {
        total: 0,
        free: 0,
      },
      disk: [],
    },
    modules: [],
    users: {
      total: 0,
      admin: 0,
      active: 0,
      activities: [],
    },
    database: {
      connections: 0,
      size: 0,
      queriesPerSecond: 0,
    },
  } as DashboardDefaultData);

  const load = async () => {
    setIsRefreshing(true);
    const { data } = await request<DashboardDefaultData>({
      url: "/core",
    });

    setData(data);

    setIsRefreshing(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5 text-primary" />
          Módulos Instalados
        </CardTitle>
        <CardDescription>Módulos e suas versões</CardDescription>
      </CardHeader>
      <CardContent>
        {isRefreshing ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center justify-between"
              >
                <div>
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <div className="mt-1 h-3 w-16 rounded bg-muted"></div>
                </div>
                <div className="h-6 w-20 rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data.modules.map((module, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{module.name}</div>
                  <div className="text-sm text-muted-foreground">
                    v{String(module.version).replace(/\^/g, "")}
                  </div>
                </div>
                <Badge variant={module.upToDate ? "outline" : "secondary"}>
                  {module.upToDate ? "Atualizado" : "Atualização disponível"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModuleInstalled;
