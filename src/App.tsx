import React from 'react';
import { Header } from './components/layout/Header';
import { Intro } from './pages/Intro';
import { ClientBasicsStep } from './pages/ClientBasicsStep';
import { Questionnaire } from './pages/Questionnaire';
import { Review } from './pages/Review';
import { Success } from './pages/Success';
import { QUESTIONS_CONFIG } from './config/questions';
import { useQuestionnaire } from './hooks/useQuestionnaire';

export const App: React.FC = () => {
  const {
    view,
    setView,
    currentQuestionIndex,
    clientBasics,
    updateClientBasics,
    answers,
    updateAnswer,
    files,
    addFiles,
    removeFile,
    externalLinks,
    updateExternalLink,
    hasExistingDraft,
    autosaveStatus,
    isSubmitting,
    submissionError,
    submissionId,
    startFresh,
    resumeDraft,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    handleFinalSubmit,
    progressPercent,
  } = useQuestionnaire();

  const currentQuestion = QUESTIONS_CONFIG[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#111111] antialiased selection:bg-[#E1F3FE] selection:text-[#1F6C9F]">
      {/* Universal Minimalist Header */}
      <Header
        currentSectionTitle={view === 'questionnaire' ? currentQuestion?.sectionTitle : undefined}
        progressPercent={progressPercent}
        autosaveStatus={autosaveStatus}
        onLogoClick={() => setView('intro')}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full">
        {view === 'intro' && (
          <Intro
            onStart={startFresh}
            hasExistingDraft={hasExistingDraft}
            onResume={resumeDraft}
          />
        )}

        {view === 'basics' && (
          <ClientBasicsStep
            basics={clientBasics}
            onUpdate={updateClientBasics}
            onNext={() => setView('questionnaire')}
            onBack={() => setView('intro')}
          />
        )}

        {view === 'questionnaire' && (
          <Questionnaire
            questionIndex={currentQuestionIndex}
            questions={QUESTIONS_CONFIG}
            currentAnswer={answers[currentQuestion.id]}
            onUpdateAnswer={updateAnswer}
            files={files.filter((f) => f.questionId === currentQuestion.id)}
            onAddFiles={addFiles}
            onRemoveFile={removeFile}
            externalLink={externalLinks[currentQuestion.id] || ''}
            onUpdateExternalLink={updateExternalLink}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onReview={() => setView('review')}
          />
        )}

        {view === 'review' && (
          <Review
            clientBasics={clientBasics}
            answers={answers}
            files={files}
            externalLinks={externalLinks}
            questions={QUESTIONS_CONFIG}
            onEditClientBasics={() => setView('basics')}
            onEditQuestion={(idx) => goToQuestion(idx)}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
          />
        )}

        {view === 'success' && (
          <Success
            submissionId={submissionId}
            clientName={clientBasics.clientName}
            onStartNew={startFresh}
          />
        )}
      </main>

      {/* Universal Agency Footer */}
      <footer className="border-t border-[#EAEAEA] py-6 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#787774] gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#111111]">LeadLinked</span>
            <span>•</span>
            <span>Client Truth Questionnaire (CTQ)</span>
          </div>
          <div className="font-mono text-[11px]">
            Confidential Client Diagnostic • All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
