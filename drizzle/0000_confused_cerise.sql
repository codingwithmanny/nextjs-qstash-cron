CREATE TABLE `qstash_messages` (
	`id` text PRIMARY KEY DEFAULT '9228c8d4-3159-43be-be3c-067bcb2c916d' NOT NULL,
	`jobId` text,
	`message` text,
	`receivedAt` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
