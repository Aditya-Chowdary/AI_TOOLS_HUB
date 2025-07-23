// lib/agents.js
"use client";

// Import the icons for the agent cards
import BriefcaseIcon from "@mui/icons-material/WorkOutline";
import VideoCameraIcon from "@mui/icons-material/VideocamOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgentOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAddOutlined";
import SummarizeIcon from "@mui/icons-material/SummarizeOutlined";
import ContactMailIcon from "@mui/icons-material/ContactMailOutlined";
import InsightsIcon from "@mui/icons-material/InsightsOutlined";
import AllInboxIcon from "@mui/icons-material/AllInboxOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

export const agentItems = [
  {
    agent_id: "video_creator",
    title: "AI Video Creator",
    description: "Generate a video using prompt",
    icon: VideoCameraIcon,
    prompt:
      "Create a video for a car company called as'Power' targeting 'luxury and long range'.",
    hasWidget: true,
  },
  {
    agent_id: "content_summarizer",
    title: "Content Summarizer",
    description:
      "Paste text or upload video to extract a summary",
    icon: SummarizeIcon,
    prompt: `Please attach your video file to summarize`,
    hasWidget: true,
  },

  {
    agent_id: "inbox_zero",
    title: "AI Inbox Agent",
    description: "Categorize an email automatically.",
    icon: AllInboxIcon,
    prompt: `Can you look at my recent emails?`,
    hasWidget: false,
  },
  {
    agent_id: "financial_forecasting",
    title: "AI Financial Forecaster",
    description: "Predict future trends from financial data.",
    icon: InsightsIcon,
    prompt:
      "Forecast the next 4 quarters for 'Quarterly Revenue' based on this data: [250000, 275000, 310000, 295000, 330000, 350000, 400000, 380000]",
    hasWidget: true,
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
    agent_id: "crm_follow_up",
    title: "AI CRM Follow-Up",
    description: "Draft a personalized follow-up email.",
    icon: ContactMailIcon,
    prompt: "Draft a follow-up email for customer 'jane.doe@example.com'.",
    hasWidget: true,
  },

  {
    agent_id: "freelance_proposal",
    title: "AI Project Proposal",
    description: "Generate a professional project proposal.",
    icon: BriefcaseIcon,
    prompt:
      "Generate a project proposal for 'Global Tech Inc.' for a 'new e-commerce platform'.",
    hasWidget: false,
  },
  // This is the corrected object for your lib/agents.js file

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
    prompt:
      "Schedule a meeting with ['Alice', 'Bob'] for 'Q3 Kick-off' tomorrow at 3 PM.",
    hasWidget: false,
  },

  //   {
  //     agent_id: "flowchart_agent",
  //     title: "AI Flowchart Generator",
  //     description: "Visualize any process or concept.",
  //     icon: AccountTreeIcon,
  //     prompt: "Create a flowchart for the scientific method",
  //     hasWidget: true,
  //   },
  //   {
  //     agent_id: "tts_agent",
  //     title: "AI Voice Actor",
  //     description: "Convert any text into high-quality speech.",
  //     icon: RecordVoiceOverIcon,
  //     prompt: "Generate the following line in a clear voice: 'Hello, this is a test of the new text to speech agent.'",
  //     hasWidget: true,
  //   },
];
