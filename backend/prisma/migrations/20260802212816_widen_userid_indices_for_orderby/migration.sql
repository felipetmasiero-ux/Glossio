-- DropIndex
DROP INDEX "Flashcard_userId_idx";

-- DropIndex
DROP INDEX "LessonProgress_userId_idx";

-- DropIndex
DROP INDEX "StudyEvent_userId_idx";

-- DropIndex
DROP INDEX "VideoProgress_userId_idx";

-- CreateIndex
CREATE INDEX "Flashcard_userId_createdAt_idx" ON "Flashcard"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_lessonId_idx" ON "LessonProgress"("userId", "lessonId");

-- CreateIndex
CREATE INDEX "StudyEvent_userId_createdAt_idx" ON "StudyEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "VideoProgress_userId_language_videoId_idx" ON "VideoProgress"("userId", "language", "videoId");
