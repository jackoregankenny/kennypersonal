---
title: 'How I Computer'
date: '2024-07-28'
excerpt: 'Roughly how I use computers'
---

Inspired by a blog from [John Seager](https://jnsgr.uk/2024/07/how-i-computer-in-2024/), I decided to share my own tech setup and workflow. This is how I use my machines in 2024.

## My Current Computer Setup

At home, I run a custom-built small form-factor PC with a Ryzen 7 7900X 3D and an RTX 4080. I’ve got 3D-printed guides to manage airflow, and three Noctua fans that produce lots of it. This PC sits on a rail in my Ikea Alex drawers, taking up the bottom two drawers, the alex is fitted with a couple of fans. This way, I don’t have to hear it, and the fans never really hit anything above 1500 rpm even when it’s intense. My resting CPU temperature is around 29-35 degrees Celsius, thanks to these guides, which I think is excellent.

Here are the full specs of my desktop:

	•	CPU: Ryzen 7 7900X 3D
	•	GPU: RTX 4080
	•	RAM: 64GB
	•	Motherboard: MATX Gigabyte board
	•	Cooling: 3D-printed airflow guides with three Noctua fans
	•	Case: Sama iM01

For my display setup, I use a 49-inch Samsung Odyssey G9 with a 34-inch ViewSonic monitor mounted above it, both horizontal. I like this setup because it’s essentially four monitors when I’m working, and I can turn the top one off when I’m sim racing to avoid distractions.

Additionally, I use an M1 Max MacBook Pro, spec’d out. I got this as payment for a job because I needed it to interact with startups. I spend a lot of time running around Dublin and am even writing this while visiting my girlfriend in London. I do about 60% of my work on the MacBook and 40% on my desktop. 

When remote and I need more GPU power or don’t want to slow down the MacBook, I SSH into my desktop. This setup is also handy for running CFD and other demanding tasks, as Windows handles these better.

## Servers

I have two Dell R210 servers, each with about 40 terabytes of storage. They are mirrored and house all my old GPUs, providing additional compute power. All my storage is on these external servers at home, which is cool because I wipe my computers fairly often. Having scripts to quickly set things up is essential. For Windows, I use [Chris Titus’s Windows Debloater](https://christitus.com/windows-tool/) and installer, and for Mac, I have a Brew script.

## Daily Tools and Applications

I write everything in Obsidian and use [Notion Calendar](https://cron.com/) (Prev. Cron) for scheduling. Finding a good calendar app has been a challenge. Apple Calendar has some incredible features but isn’t available on Windows and is slow for data entry. Cron was decent but also not ideal. Cron is out of the way, reasonably fast, and shortcut-based. Other options like [amie](https://amie.so/) are too heavy, and no tool seems to get time management as a resource quite right. [Maggie Appleton](https://maggieappleton.com/speculative-events) has written some thoughts on this I like, I might too soon. 

For 3D modelling and 2D design, I live in Fusion 360 and Figma. Currently I'm exploring the effect of turbulent air on electric car battery efficiency, this is using a lot of local GPU's with autodesk CFD and Fusion 360. I will likely try moving to openfoam soon, but I need to get a better understanding of the software first. It's lovely and open source but there's a much steeper learning curve and I'm not sure if it's worth it yet.

## Development and Coding Practices

VS Code is my main code editor, and I use it extensively for scripting and managing my Obsidian notes. I prefer writing in Markdown because it ensures my notes are in a universal format that any app can read. If Obsidian dies, I can just use VS Code or another app without issues. It’s all about file over app and link to file over app for me.

I use Alacritty as my terminal because it’s lightweight and I can make it look nice quickly. I like my terminals to be transparent since I often have a cheat sheet or ChatGPT open behind it.

For window managment I use Raycast on Mac and PowerToys on Windows to manage window tiling. Coming from using Linux and Hyperland, I haven’t found a good Windows or Mac alternative, so I’ve cobbled together shortcuts to mimic tiling.

Everything I do is managed locally with Gitea, a self-hosted Git service. For projects that might live outside of my house or go online, I use my personal GitHub. I default to Django as below for many of my projects. It’s a bit heavier and slower, but it lets me spin up applications quickly, especially useful for hackathons and rapid development.

A friend of mine, [John](https://johndenny.dev), wrote some a script called Blonde that sets up a Flask web app with a virtual environment quickly. It was incredibly useful for hackathons during Patch, so I made something similar for Django, creating scripts that streamline the setup process and automatically create user accounts, make initial migrations and sets up react. 
For JavaScript, I use [kiramase](https://kirimase.dev) as a template. This Next.js app has been fantastic for building things like [Salt Harbour’s](https://saltharbour.com) landing page and my personal website where you’re reading this.

For actual big boy projects, I often use Rust, especially for firmware. Recently, I’ve been leaning towards Go for backend development though. Go strikes a nice balance between fast development time, quick execution, and reasonable resource optimisation without the complications I sometimes face with Rust. For UI, I use [Wails](https://wails.io/) on top of Go, letting me write the user interface in JavaScript. Even though I really dislike JavaScript, it’s well-documented, and I can use tools like Claude or ChatGPT with Tailwind to quickly create a decent-looking UI.

One thing I want to learn is C# and the .NET suite, especially for cross-platform development. It seems like a powerful toolset that could be beneficial for future projects.

## Automation and Virtual Assistance

[Active-pieces](https://www.activepieces.com/) is a cornerstone of my workflow automation. It helps me manage scripts and tasks triggers. Because my servers run Coolify I can spin up a activepieces server in one click. 

Activepieces isn’t just for basic tasks; it lets me manage a CRM from a NoCode database, [NoCodeDB](https://nocodb.com/). I’m eager to try a new tool called [Table](https://www.usetable.ai/), but so far, NoCodeDB has been fantastic. I’ve tried many, many CRMs (maybe I should write about it), and none have quite met my needs, so I built my own using Activepieces and NoCodeDB.

Activepieces also helps by concatenating notes, sending updates, and managing my CRM tasks easily. I can get ChatGPT to do things on command and set up various automations. My end goal is turning a five-euro Contabo instance into a virtual assistant, but LLM costs and my current understanding of Retrieval Augmented Generation (RAG) are holding me back, I have compute at home so hopefully with the new ollama stuff I can give it a go once back in Ireland.

Close to that is a whatsapp bot bot I use for scheduling calendar events quickly. I can send a natural language request, and it figures out the time zones and creates the invite. This bot is incredibly efficient for managing my schedule on the fly.

The primary motivator here is that I'm unfortunately not as good as being on the ball as I was and I'm trying to help myself get back onto that whether he replying to things quicker or being more diligent for calendar and time. 

I use a Python script in VS Code to manage my Obsidian notes, ensuring everything is tagged and organised. This script runs non-destructively and backs up data to Git before making changes.

Additionally, I plan to use Outline for managing documentation for an upcoming project.

If anyone has suggestions for using Activepieces to automate more tasks, I’m all ears. My next challenge is automating tax tracking—monitoring purchases, earnings, and ensuring the correct taxes are paid, essentially automating cash flow management.
