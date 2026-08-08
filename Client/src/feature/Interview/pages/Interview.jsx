import React, { useState, useContext, useEffect } from "react";
import { useInterviewHook } from "../Hooks/useInterview.js";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";



function ProgressRing({ size = 120, stroke = 10, progress = 75 }) {
    const normalizedRadius = (size - stroke) / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={size} width={size} className="block">
            <circle
                stroke="#1f2937"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="#10b981"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-white font-semibold"
                style={{ fontSize: size * 0.22 }}
            >
                {progress}%
            </text>
        </svg>
    );
}

export default function Interview() {

    const { report, getReportById, generateResmue, loading} = useInterviewHook()
    const {interviewId} = useParams();

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])
   

    const safeReport = report ?? {
        technicalQuestions: [],
        behavioralQuestions: [],
        skillGaps: [],
        matchScore: 0,
        preparationPlan: [],
    };

    const plan = safeReport.preparationPlan ?? [];

    // open Technical section by default to match desired UI
    const [activeSection, setActiveSection] = useState("technical");
    const [expandedTech, setExpandedTech] = useState({});
    const [expandedBehavioral, setExpandedBehavioral] = useState({});
    const toggleTech = (key) => {
        setExpandedTech((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleBehavioral = (key) => {
        setExpandedBehavioral((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    

    return (
        
        <div className="min-h-screen bg-slate-900 text-slate-200">
         {loading && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <Circles
        height="70"
        width="70"
        color="#ec4899"
        visible={true}
      />
    </div>
)}
            <div className="max-w-8xl mx-auto px-6 py-8 m">
                <div className="grid grid-cols-12 gap-6" >
                    {/* Left sidebar */}
                    <aside className="col-span-2 bg-slate-800 rounded-md p-4 h-[78vh] border-repo border-slate-700/50 flex flex-col">
                        <h3 className="text-sm font-semibold mb-4 text-slate-400 tracking-widest">SECTIONS</h3>
                        <nav className="space-y-3 mt-2">
                            <button
                                onClick={() => setActiveSection("technical")}
                                className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition ${activeSection === "technical"
                                    ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg"
                                    : "text-slate-300 hover:bg-slate-700/30"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${activeSection === "technical" ? "text-pink-100" : "text-slate-300"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                                <span className="text-xs font-semibold">Technical Questions</span>
                                {/* <span className="ml-auto text-xs bg-slate-700/40 px-2 py-1 rounded text-slate-300">{repo.technicalQuestions.length} questions</span> */}
                            </button>

                            <button
                                onClick={() => setActiveSection("behavioral")}
                                className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition ${activeSection === "behavioral" ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg"
                                    : "text-slate-300 hover:bg-slate-700/30"
                                    }`}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${activeSection === "behavioral" ? "text-slate-100" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                                <span>Behavioral Questions</span>
                            </button>

                            <button
                                onClick={() => setActiveSection("roadmap")}
                                className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition ${activeSection === "roadmap" ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg"
                                    : "text-slate-300 hover:bg-slate-700/30"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${activeSection === "roadmap" ? "text-slate-100" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" /></svg>
                                <span>Road Map</span>
                            </button>


                       


                        </nav>

                        <div className="mt-auto">
                            <button 
                                className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg text-slate-300 hover:bg-slate-700/30`}
                           onClick={() => {generateResmue(interviewId)}}
                           >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${activeSection === "roadmap" ? "text-slate-100" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" /></svg>
                                <span>Generate resume Pdf</span>
                            </button>
                        </div>


                    </aside>

                    {/* Main content */}
                    <main className="col-span-7 bg-slate-800 rounded-md p-6 h-[78vh] overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold">{activeSection ? activeSection.replace(/\b\w/g, (c) => c.toUpperCase()) : "Welcome"}</h2>
                            <div className="text-sm text-slate-400">{activeSection === "technical" ? `${safeReport.technicalQuestions.length} questions` : ""}</div>
                        </div>

                        <div className="space-y-4">
                            {!activeSection && (
                                <div className="text-slate-400">Select a section from the left to view its content.</div>
                            )}

                            {activeSection === "technical" && (
                                <>
                                    {safeReport.technicalQuestions.map((q, idx) => (
                                        <div key={q._id || idx} className="rounded-md bg-slate-700/20 border border-slate-700/40">
                                            <div className="px-4 py-3">
                                                <button
                                                    onClick={() => toggleTech(q._id || idx)}
                                                    className="w-full text-left flex items-center gap-4"
                                                >
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-pink-600 text-white text-sm font-semibold">Q{idx + 1}</div>
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-slate-100">{q.questions}</div>
                                                    </div>
                                                    <div className="text-slate-400">{expandedTech[q._id || idx] ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.06l-3.71 3.71a.75.75 0 11-1.06-1.06l4.24-4.24a.75.75 0 011.06 0l4.24 4.24c.3.3.3.78.01 1.06z" clipRule="evenodd" /></svg>
                                                    )}</div>
                                                </button>
                                            </div>

                                            {expandedTech[q._id || idx] && (
                                                <div className="px-4 pb-4">
                                                    <div className="bg-slate-800 rounded-md p-4 border border-slate-700/50">
                                                        <div className="mb-3">
                                                            <span className="inline-block text-xs font-semibold bg-violet-700 text-violet-100 px-2 py-1 rounded">INTENTION</span>
                                                            <div className="mt-2 text-sm text-slate-300">{q.intention}</div>
                                                        </div>

                                                        <div className="mt-3">
                                                            <span className="inline-block text-xs font-semibold bg-emerald-700 text-emerald-100 px-2 py-1 rounded">MODEL ANSWER</span>
                                                            <div className="mt-2 text-sm text-slate-200 bg-slate-900/60 p-3 rounded mt-2">{q.answer}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                            {activeSection === "behavioral" && (
                                <>
                                    {safeReport.behavioralQuestions.map((b, i) => (
                                        <div key={b._id || i} className="rounded-md bg-slate-700/20 border border-slate-700/40">
                                            <div className="px-4 py-3">
                                                <button
                                                    onClick={() => toggleBehavioral(b._id || i)}
                                                    className="w-full text-left flex items-center gap-4"
                                                >
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white text-sm font-semibold">B{i + 1}</div>
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-slate-100">{b.questions}</div>
                                                    </div>
                                                    <div className="text-slate-400">{expandedBehavioral[b._id || i] ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.06l-3.71 3.71a.75.75 0 11-1.06-1.06l4.24-4.24a.75.75 0 011.06 0l4.24 4.24c.3.3.3.78.01 1.06z" clipRule="evenodd" /></svg>
                                                    )}</div>
                                                </button>
                                            </div>

                                            {expandedBehavioral[b._id || i] && (
                                                <div className="px-4 pb-4">
                                                    <div className="bg-slate-800 rounded-md p-4 border border-slate-700/50">
                                                        <div className="mb-3">
                                                            <span className="inline-block text-xs font-semibold bg-violet-700 text-violet-100 px-2 py-1 rounded">INTENTION</span>
                                                            <div className="mt-2 text-sm text-slate-300">{b.intention}</div>
                                                        </div>

                                                        <div className="mt-3">
                                                            <span className="inline-block text-xs font-semibold bg-emerald-700 text-emerald-100 px-2 py-1 rounded">MODEL ANSWER</span>
                                                            <div className="mt-2 text-sm text-slate-200 bg-slate-900/60 p-3 rounded mt-2">{b.answer}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                            {activeSection === "roadmap" && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold">Preparation Road Map</h3>
                                        <span className="text-sm bg-slate-700/30 px-3 py-1 rounded-full text-slate-300">7-day plan</span>
                                    </div>

                                    <div className="relative">
                                        {/* vertical line */}
                                        <div className="absolute left-6 top-0 bottom-0 w-px bg-pink-600/50 ml-0"></div>

                                        <div className="space-y-8 pl-12">
                                            {plan.map((p, i) => (
                                                <div key={p.day} className="flex items-start gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-4 h-4 rounded-full bg-pink-600 ring-2 ring-slate-900"></div>
                                                        {i !== plan.length - 1 && <div className="flex-1 w-px bg-pink-600/50 mt-1"></div>}


                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-sm font-semibold text-pink-400">{p.day}</div>
                                                            <div className="text-lg font-semibold">{p.focus}</div>
                                                        </div>
                                                        <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                                                            {p.tasks.map((b, j) => (
                                                                <li key={j}>{b}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Right panel */}
                    <aside className="col-span-3 bg-slate-800 rounded-md p-6 h-[78vh] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="w-36 h-36 bg-slate-700 rounded-full flex items-center justify-center">
                                    <ProgressRing size={140} stroke={12} progress={safeReport.matchScore} />
                                </div>
                            </div>

                            <h4 className="mt-6 text-lg font-semibold">Match Score</h4>
                            <p className="text-sm text-slate-400">Strong match for this role</p>

                            <div className="mt-6">
                                <h5 className="font-semibold mb-2">Skill Gaps</h5>
                                <div className="space-y-3">
                                    {safeReport.skillGaps.map((g, i) => {
                                        const color = g.severity === "high" ? "bg-rose-700 text-white" : g.severity === "medium" ? "bg-amber-700 text-slate-900" : "bg-emerald-800 text-white";
                                        return (
                                            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded ${color}`}>
                                                <div className={`w-2 h-6 rounded-full ${g.severity === "high" ? "bg-rose-400" : g.severity === "medium" ? "bg-amber-300" : "bg-emerald-400"}`}></div>
                                                <div className="text-sm">{g.skill}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="h-36 bg-slate-700 rounded-md overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-slate-400">Video / Interview preview</div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}


