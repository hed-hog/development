import { User, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApp } from "@/hooks/use-app";
import { DashboardDefaultData } from "@/types";
import { useNavigate } from "react-router-dom";

const UserSummary = () => {
  const navigate = useNavigate();
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
          <Users className="mr-2 h-5 w-5 text-primary" />
          Resumo de Usuários
        </CardTitle>
        <CardDescription>Visão geral dos usuários do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isRefreshing ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse flex-col items-center justify-center rounded-lg bg-primary/10 p-3"
                >
                  <div className="h-6 w-12 rounded bg-muted"></div>
                  <div className="mt-2 h-4 w-16 rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3">
                  <div className="text-2xl font-bold">{data.users.total}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3">
                  <div className="text-2xl font-bold">{data.users.admin}</div>
                  <div className="text-xs text-muted-foreground">Admins</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3">
                  <div className="text-2xl font-bold">{data.users.active}</div>
                  <div className="text-xs text-muted-foreground">Ativos</div>
                </div>
              </div>
              {data.users.activities.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">
                    Atividade Recente
                  </h3>

                  <div className="space-y-2">
                    {data.users.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{activity.user.name}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {activity.created_at}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => navigate("/users")}
        >
          <User className="mr-2 h-4 w-4" />
          Ver Todos Usuários
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserSummary;
