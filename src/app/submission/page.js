const Submission = () => {
	return (
		<div className="text-black bg-blue-100 p-8 font-sans leading-relaxed">
			<div className="flex gap-10">
				<h1 className="text-2xl font-bold mb-2">Team CargoFlow Inc.</h1>
				<p className="italic text-gray-600 mb-4">
					(This webpage was last edited on 12-13-2024)
				</p>
			</div>

			<h2 className="text-xl font-semibold mb-2">Team Members</h2>
			<ul className="list-disc list-inside mb-4">
				<li>
					Jason Chau,{" "}
					<a href="mailto:jchau044@ucr.edu" className="text-blue-600 underline">
						jchau044@ucr.edu
					</a>
				</li>
				<li>
					Danniel Kim,{" "}
					<a href="mailto:dkim481@ucr.edu" className="text-blue-600 underline">
						dkim481@ucr.edu
					</a>
				</li>
				<li>
					Gurjot Singh,{" "}
					<a href="mailto:gsing064@ucr.edu" className="text-blue-600 underline">
						gsing064@ucr.edu
					</a>
				</li>
				<li>
					Desmond Chi,{" "}
					<a href="mailto:dchi008@ucr.edu" className="text-blue-600 underline">
						dchi008@ucr.edu
					</a>
				</li>
				<li>
					Theo Fernandez,{" "}
					<a href="mailto:tfern009@ucr.edu" className="text-blue-600 underline">
						tfern009@ucr.edu
					</a>
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Project Files</h2>
			<ol className="list-decimal list-inside mb-4 space-y-2">
				<li>
					<a
						href="https://drive.google.com/file/d/1JL_BzXRfGbNrWAonA-HwpFXcyRX3kEVN/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlow.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to plan our elicitation of requirements from
					Mr. Keogh, and any notes taken during the elicitation.
				</li>
				<li className="">
					<a
						href="https://drive.google.com/file/d/1FOM86qgRk5hVelKeKrLsziqeBVaV9P2Y/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowFall2024_Attempt1.pdf</strong>
					</a>{" "}
					- Our original pitch to Mr. Keogh, delivered on October 13th, 2024, at
					9:00 AM.
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1iKqO5GUQ__ExUX9pW2Knd4O1utOK-q6q/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowFall2024_Attempt1_Revised.pdf</strong>
					</a>{" "}
					- A new version of the pitch with all corrections, amendments, and
					deletions suggested by Mr. Keogh (and/or Dr. Keogh).
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1ohQOhnSiVRi2QzfydBgoBBgXHT3IdppM/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowDesign.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to design our software.
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1Vs6hPF17p9imkeJorl4mx86eeUq6qeP2/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowTesting.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to test our software.
				</li>
				<li>
					This URL:{" "}
					<a
						href="https://github.com/pondohoo/cs-179-cargoflow"
						className="text-blue-600 underline"
					>
						github.com/pondohoo/cs-179-cargoflow
					</a>{" "}
					- Points to a GitHub repository of our code.
				</li>
				<li className="">
					This{" "}
					<a href="https://youtu.be/X93dlakq2KQ" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					- Shows our software solving one balance and one transfer test case.
				</li>
				<li className="">
					<a href="https://drive.google.com/file/d/1iV4nN704zw3996auj11TexRCorT5U8I8/view?usp=sharing" className="text-blue-600 underline">
						<strong>KeoghsPort2024.txt</strong>
					</a>
					 - Log created by our software
					during the making of the YouTube video.
				</li>
				<li className="">
					We would like to point out the following limitations:
					<ul className="list-disc list-inside">
						<li className="">
							The website&#39;s storage capacity is limited, and running a complex
							A*&#10;search for a certain amount of time tends to exceed it,
							causing the&#10;function to pause and stop running. To address this,
							we reduced the&#10;time limit from 15 minutes to 13 minutes. While
							this change prevents&#10;the website from pausing, it also results
							in a potential less optimal&#10;solution. This limitation also stops
							the use of the buffer in the case of time limit exceeded because A*
							is in charge of using the buffer to find the optimal steps.
						</li>
						<li>
							For load/unloading buffer use has not been implemented.
						</li>
					</ul>
				</li>
				<li className="">
					(EK says, this is optional) Here is some additional items you may find useful in grading the project.
					<ul className="list-disc list-inside">
						<li className="">
							Upon reviewing the submission video, we realized that the log file
							name was incorrect. This was corrected, but not reflected in the video.
						</li>
					</ul>
				</li>
				<li className="">
					(EK says, this is optional) We would like to acknowledge the following ...
					<ul className="list-disc list-inside">
						<li className="">
							As not all members were experts on Javascript and Next.js, we had to research and learn the language and framework.
							The sources we consulted were: the Next.js documentation, the JavaScript documentation, the React documentation,
							Google, Stack Overflow, and GeeksforGeeks.
						</li>
					</ul>
				</li>
			</ol>
		</div>
	);
};

export default Submission;
