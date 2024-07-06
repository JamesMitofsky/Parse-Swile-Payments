type Currency = {
  iso_3: string;
  symbol: string;
  title: string;
};

type Amount = {
  value: number;
  currency: Currency;
};

type Debitor = {
  id: string;
  type: string;
  name: string;
  avatar_url: null | string;
};

type Transaction = {
  id: string;
  object: string;
  type: string;
  status: string;
  payment_method: null;
  wallet: null;
  date: string;
  expiration_date: null;
  amount: Amount;
  refunded_amount: null;
  card: null;
  beneficiary: null;
  visible: boolean;
};

type Tag = {
  short: string;
  long: string;
  cta: null;
};

type AvailableSupportTicketsRequests = {
  go_back_in_time: boolean;
  refund: boolean;
  eligibility: boolean;
  payment_problem: boolean;
};

export type Operation = {
  id: string;
  object: string;
  type: string;
  display_type: string;
  name: string;
  message: null;
  debitor: Debitor;
  creditor: null;
  initiator: null;
  amount: Amount;
  amount_hidden: null;
  main_payment_method: null;
  date: string;
  small_icon: {
    url: null;
    category: null;
  };
  large_icon: {
    url: null;
    category: string;
  };
  vendor_merchant_id: string;
  is_bank_imprint: boolean;
  requests_in_progress: any[];
  card: {
    uuid: string;
  };
  transactions: Transaction[];
  tag: Tag;
  available_support_tickets_requests: AvailableSupportTicketsRequests;
  source_operation_id: null;
  related_operations: null;
  support_tickets: null;
  is_visible: boolean;
  details: any[];
};
