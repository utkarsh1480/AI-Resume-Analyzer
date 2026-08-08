import React, { useState, useRef } from "react";
import { useInterviewHook } from "../Hooks/useInterview.js";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import {
  CloudArrowUpIcon,
  BriefcaseIcon,
  UserCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { generateReport ,reports} = useInterviewHook();
  const resumeInputRef = useRef()
  const navigate = useNavigate();

  const handelFrom = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile) {
      alert('Please upload a resume before submitting.');
      return;
    }

    setLoading(true);
    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (!data?._id) {
        throw new Error('Report creation failed - no report id returned');
      }
      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.error('handleForm error:', error);
      alert(error?.response?.data?.message || error.message || 'Unable to generate report. Please login and try again.');
    } finally {
      setLoading(false);
    }
  };

  
    return (
   
   <div className="min-h-screen bg-[#0d1117] px-6 py-12">

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
 
      {/* Heading */}

      <div className="max-w-6xl mx-auto text-center mb-10">

        <h1 className="text-6xl font-extrabold text-white">
          Create Your Custom{" "}
          <span className="text-pink-500">Interview Plan</span>
        </h1>

        <p className="mt-5 text-gray-400 text-xl max-w-3xl mx-auto">
          Let our AI analyze the job requirements and your unique profile
          to build a winning strategy.
        </p>

      </div>

      {/* Main Container */}

      <div className="max-w-6xl mx-auto rounded-2xl border border-[#2d3440] bg-[#171c24] overflow-hidden shadow-2xl">

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

          {/* LEFT */}

          <div className="p-8 border-r border-[#2d3440] flex flex-col">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <BriefcaseIcon className="w-6 h-6 text-pink-500" />

                <h2 className="text-2xl font-bold text-white">
                  Target Job Description
                </h2>

              </div>

              <span className="bg-pink-500/20 text-pink-400 text-xs font-semibold px-4 py-1 rounded-full">
                REQUIRED
              </span>

            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              className="flex-1 min-h-[520px] rounded-xl bg-[#242b3d] border border-[#323b4b] p-6 text-lg text-gray-200 placeholder:text-gray-500 resize-none outline-none focus:border-pink-500 transition"
            />

            <div className="mt-3 text-right text-gray-500">
              {/* {jobDescription.length} / 5000 chars */}
            </div>

          </div>
                    {/* RIGHT */}

          <div className="p-8 flex flex-col">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

              <UserCircleIcon className="w-6 h-6 text-pink-500" />

              <h2 className="text-2xl font-bold text-white">
                Your Profile
              </h2>

            </div>

            {/* Upload Heading */}

            <div className="flex items-center gap-3 mb-3">

              <label className="text-lg font-semibold text-white">
                Upload Resume
              </label>

              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-semibold">
                BEST RESULTS
              </span>

            </div>

            {/* Hidden Input */}

            <input
              id="resume"
              type="file"
              hidden
              ref={resumeInputRef}
            />

            {/* Upload Box */}

            <label
              htmlFor="resume"
              className="
              h-44
              rounded-xl
              border
              border-dashed
              border-[#3a4254]
              bg-[#242b3d]
              hover:border-pink-500
              transition
              cursor-pointer
              flex
              flex-col
              justify-center
              items-center
              "
            >

              <CloudArrowUpIcon className="w-12 h-12 text-pink-500" />

              <h3 className="text-white text-xl font-semibold mt-4">
                Click to upload or drag & drop
              </h3>

              <p className="text-gray-400 mt-2">
                PDF  (Max 5MB)
              </p>

              {/* {
                fileName && (
                  <p className="mt-4 text-pink-400 font-medium">
                    {fileName}
                  </p>
                )
              } */}

            </label>

            {/* Divider */}

            <div className="flex items-center my-8">

              <div className="flex-1 h-px bg-[#323b4b]" />

              <span className="mx-5 text-gray-500 font-semibold">
                OR
              </span>

              <div className="flex-1 h-px bg-[#323b4b]" />

            </div>

            {/* Self Description */}

            <label className="text-lg font-semibold text-white mb-3">
              Quick Self-Description
            </label>

            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)
              }
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              className="
                h-36
                rounded-xl
                border
                border-pink-500/60
                bg-[#242b3d]
                p-5
                text-gray-200
                placeholder:text-gray-500
                resize-none
                outline-none
                focus:border-pink-500
              "
            />

            {/* Info Box */}

            <div className="mt-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-5 flex items-start gap-3">

              <InformationCircleIcon className="w-6 h-6 text-blue-400 shrink-0" />

              <p className="text-blue-200 leading-7">

                Either a{" "}

                <span className="font-bold">
                  Resume
                </span>

                {" "}or a{" "}

                <span className="font-bold">
                  Self Description
                </span>

                {" "}is required to generate a personalized plan.

              </p>

            </div>

          </div>

        </div>
                {/* Bottom Footer */}

        <div className="border-t border-[#2d3440] px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">

          <p className="text-gray-400 text-sm">
            AI-Powered Strategy Generation • Approx 30s
          </p>

          <button
            className="
            flex
            items-center
            gap-3
            px-10
            py-4
            rounded-xl
            bg-gradient-to-r
            from-pink-600
            to-pink-500
            text-white
            font-semibold
            text-lg
            shadow-lg
            shadow-pink-500/30
            hover:shadow-pink-500/60
            hover:scale-[1.02]
            transition-all
            duration-300
            "
            onClick={handelFrom}
          >
            <SparklesIcon className="w-6 h-6" />
            Generate My Interview Strategy
          </button>

        </div>

      </div>

      

      {/* Footer */}


      <footer className="mt-10 text-center">

        <div className="flex justify-center gap-8 text-gray-500 text-sm">

          <button className="hover:text-pink-400 transition">
            Privacy Policy
          </button>

          <button className="hover:text-pink-400 transition">
            Terms of Service
          </button>

          <button className="hover:text-pink-400 transition">
            Help Center
          </button>

        </div>

      </footer>

      <div className="mt-10 bg-slate-900 rounded-3xl border border-slate-700 p-6 shadow-xl shadow-pink-500/10 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Previous Reports</h3>
            <p className="text-sm text-slate-400">Open one of your generated reports or create a new strategy.</p>
          </div>
          <span className="inline-flex rounded-full bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-300">{reports.length} reports</span>
        </div>

        {reports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <div key={report._id || report.id} className="rounded-3xl border border-slate-700 bg-slate-800 p-5 shadow-sm shadow-black/20 transition hover:border-pink-500" onClick={() => navigate(`/interview/${report._id}`)}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{report.title || "Interview Report"}</h4>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{report.title || report.title || "No description available."}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-300">{new Date(report.createdAt || report.updatedAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-slate-300">
                  {report.matchScore != null && (
                    <div className="inline-flex items-center gap-2">
                      <span className="font-semibold text-slate-100">Match:</span>
                      <span className="text-pink-300">{report.matchScore}%</span>
                    </div>
                  )}
                  {report.skillGaps?.length > 0 && (
                    <div className="inline-flex items-center gap-2">
                      <span className="font-semibold text-slate-100">Gaps:</span>
                      <span>{report.skillGaps.length} identified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center text-slate-400">
            No previous reports found. Generate your first interview plan to see it here.
          </div>
        )}
      </div>

    </div>

  );
}

export default Home;