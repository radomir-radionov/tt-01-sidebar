import { RouterMenu } from "./components/RouterMenu";
import { useIsMobile } from "../sidebar-menu";
import {
  ClientsIcon,
  InventoryIcon,
  KnowledgeIcon,
  PaymentsIcon,
  ReportsIcon,
  SettingsIcon,
  ShopIcon,
  TasksIcon,
  TenderIcon,
  TicketsIcon,
  TrendsIcon,
} from "../shared/assets/icons";

/**
 * Business sidebar — tree only.
 * Active route, navigation, and HelloClient paint live in RouterMenu.
 */
export function AppSidebar() {
  const isMobile = useIsMobile();

  return (
    <RouterMenu>
      <RouterMenu.Item label="Trends" to="/trends" icon={<TrendsIcon />} />
      <RouterMenu.Item label="Tasks" to="/tasks" icon={<TasksIcon />} />
      <RouterMenu.Item label="Tickets" to="/tickets" icon={<TicketsIcon />} />
      <RouterMenu.Item
        label="Payments"
        to="/payments"
        icon={<PaymentsIcon />}
      />

      <RouterMenu.Group label="Clients" icon={<ClientsIcon />}>
        <RouterMenu.Item label="List" to="/clients/list" />
        <RouterMenu.Item label="Reviews" to="/clients/reviews" />
        <RouterMenu.Item label="Notifications" to="/clients/notifications" />
      </RouterMenu.Group>

      <RouterMenu.Group label="Inventory" icon={<InventoryIcon />}>
        <RouterMenu.Item label="Products" to="/inventory/products" />
        <RouterMenu.Item label="Orders" to="/inventory/orders" />
        <RouterMenu.Item label="Suppliers" to="/inventory/suppliers" />
      </RouterMenu.Group>

      <RouterMenu.Item label="Shop" to="/shop" icon={<ShopIcon />} />
      <RouterMenu.Item label="Reports" to="/reports" icon={<ReportsIcon />} />
      <RouterMenu.Item label="Tender" to="/tender" icon={<TenderIcon />} />

      {!isMobile && (
        <>
          <div className="my-2 border-t border-line" role="separator" />

          <RouterMenu.Item
            label="Settings"
            to="/settings"
            icon={<SettingsIcon />}
          />
          <RouterMenu.Item
            label="Knowledge Base"
            to="/knowledge"
            icon={<KnowledgeIcon />}
          />
        </>
      )}
    </RouterMenu>
  );
}
