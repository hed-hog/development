import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useWalletTransactionGet,
  useWalletTransactionUpdate,
} from "@/features/wallet/wallet-transaction";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { WalletTransaction } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type WalletTransactionUpdatePanelProps = {
  data: WalletTransaction;
  onUpdated?: (data: WalletTransaction) => void;
};

const WalletTransactionUpdatePanel = forwardRef(
  ({ data, onUpdated }: WalletTransactionUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useWalletTransactionGet(
      data.id as number,
    );
    const { mutate: walletTransactionUpdate } = useWalletTransactionUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: "wallet_id",
                      label: {
                        text: t("wallet_transaction.wallet_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/wallet",
                      displayName: "wallet",
                      valueName: "id",
                    },

                    {
                      name: "type",
                      label: {
                        text: t("wallet_transaction.type", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "amount",
                      label: {
                        text: t("wallet_transaction.amount", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    walletTransactionUpdate({
                      id: data.id,
                      data,
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

WalletTransactionUpdatePanel.displayName = "WalletTransactionUpdatePanel";

export default WalletTransactionUpdatePanel;
