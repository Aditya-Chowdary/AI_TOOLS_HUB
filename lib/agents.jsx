// lib/agents.js
'use client';

// Import the icons for the agent cards
import BriefcaseIcon from '@mui/icons-material/WorkOutline';
import VideoCameraIcon from '@mui/icons-material/VideocamOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAddOutlined';
import SummarizeIcon from '@mui/icons-material/SummarizeOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMailOutlined';
import InsightsIcon from '@mui/icons-material/InsightsOutlined';
import AllInboxIcon from '@mui/icons-material/AllInboxOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export const agentItems = [
  {
    agent_id: "financial_forecasting",
    title: "AI Financial Forecaster",
    description: "Predict future trends from financial data.",
    icon: InsightsIcon,
    prompt: "Forecast the next 4 quarters for 'Quarterly Revenue' based on this data: [250000, 275000, 310000, 295000, 330000, 350000, 400000, 380000]",
    hasWidget: true,
  },
  {
    agent_id: "crm_follow_up",
    title: "AI CRM Follow-Up",
    description: "Draft a personalized follow-up email.",
    icon: ContactMailIcon,
    prompt: "Draft a follow-up email for customer 'jane.doe@example.com'.",
    hasWidget: true,
  },
  {
    agent_id: "video_creator",
    title: "AI Video Creator",
    description: "Generate a compelling video sales script.",
    icon: VideoCameraIcon,
    prompt: "Create a video sales letter for 'SynthWave AI' targeting 'startup founders'.",
    hasWidget: true,
  },
  {
    agent_id: "freelance_proposal",
    title: "AI Project Proposal",
    description: "Generate a professional project proposal.",
    icon: BriefcaseIcon,
    prompt: "Generate a project proposal for 'Global Tech Inc.' for a 'new e-commerce platform'.",
    hasWidget: false,
  },
  // This is the corrected object for your lib/agents.js file

{
    agent_id: "content_summarizer",
    title: "Content Summarizer", 
    description: "Paste text or upload video to get a full summary with action items.", 
    icon: SummarizeIcon,
    prompt: `Please summarize these meeting notes and tell me what the action items are:

Okay team, let's recap the weekly sync. Project Titan's launch is on track for the 15th. 
The marketing team has done a great job with the new ad campaign, 
but we've noticed a 10% drop in user engagement on the beta platform since last week's update. 
This is a red flag. Sarah, can you please form a small task force to investigate the root cause of the engagement drop? 
We need a preliminary report by next Wednesday. Also, Alex, I will need you to prepare the initial budget forecast for Project Phoenix 
and have it ready for the leadership review on Friday.`,
    hasWidget: true, 
},
  {
    agent_id: "onboarding_bot",
    title: "AI Onboarding Bot",
    description: "Create a checklist for a new client.",
    icon: PlaylistAddCheckIcon,
    prompt: `Generate an onboarding checklist for "Nexus Dynamics" for our "SaaS Enterprise" service.`,
    hasWidget: false,
  },
  {
    agent_id: "virtual_employee",
    title: "AI Virtual Employee",
    description: "Schedule a meeting with your team.",
    icon: GroupAddIcon,
    prompt: "Schedule a meeting with ['Alice', 'Bob'] for 'Q3 Kick-off' tomorrow at 3 PM.",
    hasWidget: false,
  },
  {
    agent_id: "customer_support",
    title: "AI Customer Support",
    description: "Get an automated answer for a support query.",
    icon: SupportAgentIcon,
    prompt: "What is your policy on international shipping?",
    hasWidget: false,
  },
  {
    agent_id: "inbox_zero",
    title: "AI Inbox Agent",
    description: "Categorize an incoming email automatically.",
    icon: AllInboxIcon,
    prompt: `Categorize an email with the subject "Urgent: Invoice #54321 Due" from "accounts@billing.com".`,
    hasWidget: false,
  },
  {
    agent_id: "flowchart_agent",
    title: "AI Flowchart Generator",
    description: "Visualize any process or concept.",
    icon: AccountTreeIcon,
    prompt: "Create a flowchart for the scientific method",
    hasWidget: true,
  },
  {
    agent_id: "tts_agent",
    title: "AI Voice Actor",
    description: "Convert any text into high-quality speech.",
    icon: RecordVoiceOverIcon,
    prompt: "Generate the following line in a clear voice: 'Hello, this is a test of the new text to speech agent.'",
    hasWidget: true,
  },
];