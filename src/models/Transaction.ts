import { User } from './User';
import { Gig } from './Gig';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: 'INR' | 'BARTER_CREDIT';
  status: TransactionStatus;
  referenceId?: string; // Gig ID or Swap ID
  fromUserId: string;
  toUserId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  paymentMethod?: PaymentMethod;
  metadata?: TransactionMetadata;
}

export interface TransactionMetadata {
  gigId?: string;
  swapId?: string;
  proposalId?: string;
  milestoneId?: string;
  platformFee?: number;
  taxAmount?: number;
  discountCode?: string;
  refundReason?: string;
}

export enum TransactionType {
  PAYMENT = 'payment',
  REFUND = 'refund',
  BARTER_CREDIT = 'barter_credit',
  PLATFORM_FEE = 'platform_fee',
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit'
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  DISPUTED = 'disputed'
}

export enum PaymentMethod {
  UPI = 'upi',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CASH = 'cash',
  BARTER = 'barter'
}

export interface Earnings {
  totalEarnings: number; // in INR
  barterCredits: number;
  monthlyBreakdown: MonthlyEarnings[];
  upcomingPayments: UpcomingPayment[];
}

export interface MonthlyEarnings {
  month: string; // YYYY-MM format
  inr: number;
  barterCredits: number;
  gigsCompleted: number;
  swapsCompleted: number;
}

export interface UpcomingPayment {
  amount: number;
  currency: 'INR' | 'BARTER_CREDIT';
  dueDate: Date;
  reference: string; // Gig or Swap title
  status: 'pending' | 'overdue';
}

export interface Withdrawal {
  id: string;
  amount: number;
  accountNumber: string;
  ifscCode: string;
  status: WithdrawalStatus;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failureReason?: string;
}

export enum WithdrawalStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}