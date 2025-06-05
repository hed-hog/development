import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useWalletPersonGet,
  useWalletPersonUpdate,
} from "@/features/wallet/wallet-person";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { WalletPerson } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type WalletPersonUpdatePanelProps = {
  data: WalletPerson;
  onUpdated?: (data: WalletPerson) => void;
};

const WalletPersonUpdatePanel = forwardRef(
  ({ data, onUpdated }: WalletPersonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useWalletPersonGet(data.id as number);
    const { mutate: walletPersonUpdate } = useWalletPersonUpdate();
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
                        text: t("wallet_person.wallet_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/wallet",
                      displayName: "wallet",
                      valueName: "id",
                    },

                    {
                      name: "person_id",
                      label: {
                        text: t("wallet_person.person_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person",
                      displayName: "person",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    walletPersonUpdate({
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

WalletPersonUpdatePanel.displayName = "WalletPersonUpdatePanel";

export default WalletPersonUpdatePanel;
