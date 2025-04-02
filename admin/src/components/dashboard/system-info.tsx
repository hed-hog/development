import { Cpu, HardDrive, Server } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/hooks/use-app";
import { bytesToHuman } from "@/lib/bytes-to-human";
import { secondsToHuman } from "@/lib/seconds-to-human";
import { DashboardDefaultData } from "@/types";

const SystemInfo = () => {
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
          <Server className="mr-2 h-5 w-5 text-primary" />
          Informações do Sistema
        </CardTitle>
        <CardDescription>
          Detalhes do sistema operacional e hardware
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isRefreshing ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
            <Separator />
            <div className="animate-pulse">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="flex items-center text-sm font-medium">
                <HardDrive className="mr-2 h-4 w-4 text-muted-foreground" />
                Sistema Operacional
              </h3>
              <div className="mt-1 grid grid-cols-2 gap-1 text-sm">
                <div className="text-muted-foreground">Nome:</div>
                <div>{data.os.name}</div>
                <div className="text-muted-foreground">Versão:</div>
                <div>{data.os.version}</div>
                <div className="text-muted-foreground">Arquitetura:</div>
                <div>{data.os.architecture}</div>
                <div className="text-muted-foreground">Tempo ativo:</div>
                <div>{secondsToHuman(data.os.uptime, true)}</div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="flex items-center text-sm font-medium">
                <Cpu className="mr-2 h-4 w-4 text-muted-foreground" />
                Hardware
              </h3>
              <div className="mt-1 grid grid-cols-2 gap-1 text-sm">
                <div className="text-muted-foreground">CPU:</div>
                <div>{data.os.cpu.model}</div>
                <div className="text-muted-foreground">Memória:</div>
                <div>{bytesToHuman(data.os.memory.total)}</div>
                {data.os.disk.map((disk) => (
                  <>
                    <div className="text-muted-foreground">
                      Disco {disk.filesystem}:
                    </div>
                    <div>
                      {bytesToHuman(disk.size)} ({bytesToHuman(disk.free)} free)
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemInfo;
