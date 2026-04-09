-- CreateTable
CREATE TABLE "SyndicationSettings" (
    "articleSlug" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyndicationSettings_pkey" PRIMARY KEY ("articleSlug")
);
