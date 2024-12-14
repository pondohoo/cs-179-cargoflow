const Submission = () => {
	return (
		<div className="text-black bg-blue-100 p-8 font-sans leading-relaxed">
			<div className="flex gap-10">
				<h1 className="mb-2">Team CargoFlow Inc.</h1>
				<p className="italic text-gray-600 mb-4 ml-20">
					(This webpage was last edited on 12-13-2024)
				</p>
			</div>
			<ul className="list-disc list-inside mb-4 ml-20">
				    Jason Chau,{" "}
					<a href="mailto:jchau044@ucr.edu" className="text-blue-600 underline">
						jchau044@ucr.edu
					</a>
					<br></br>Danniel Kim,{" "}
					<a href="mailto:dkim481@ucr.edu" className="text-blue-600 underline">
						dkim481@ucr.edu
					</a>
					<br></br>Gurjot Singh,{" "}
					<a href="mailto:gsing064@ucr.edu" className="text-blue-600 underline">
						gsing064@ucr.edu
					</a>
					<br></br>Desmond Chi,{" "}
					<a href="mailto:dchi008@ucr.edu" className="text-blue-600 underline">
						dchi008@ucr.edu
					</a>
					<br></br>Theo Fernandez,{" "}
					<a href="mailto:tfern009@ucr.edu" className="text-blue-600 underline">
						tfern009@ucr.edu
					</a>
			</ul>
			<ol className="list-decimal list-inside mb-4 space-y-2">
				<li>
					This file&nbsp;
					<a
						href="https://drive.google.com/file/d/1JL_BzXRfGbNrWAonA-HwpFXcyRX3kEVN/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlow.pdf</strong>
					</a>{" "}
					contains evidence of our efforts to plan our elicitation of requirements from Mr. Keogh, and any notes taken during the elicitation.
				</li>
				<li className="">
					This file&nbsp;
					<a
						href="https://drive.google.com/file/d/1FOM86qgRk5hVelKeKrLsziqeBVaV9P2Y/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowProjectPitchORIGINAL.pdf</strong>
					</a>{" "}
					contains our original pitch to Mr. Keogh, which was delivered on October 13th, 2024, at
					9:00 AM.
				</li>
				<li>
					This file&nbsp;
					<a
						href="https://drive.google.com/file/d/1iKqO5GUQ__ExUX9pW2Knd4O1utOK-q6q/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowProjectPitchCORRECTED.pdf</strong>
					</a>{" "}
					contains a new version of the pitch, with all the corrections, amendments and deletions suggested by Mr. Keogh (and/or Dr. Keogh)
				</li>
				<li>
					This file&nbsp;
					<a
						href="https://drive.google.com/file/d/1ohQOhnSiVRi2QzfydBgoBBgXHT3IdppM/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowDesign.pdf</strong>
					</a>{" "}
					shows evidence of our efforts to design our software.
				</li>
				<li>
					This file&nbsp;
					<a
						href="https://drive.google.com/file/d/1Vs6hPF17p9imkeJorl4mx86eeUq6qeP2/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowTesting.pdf</strong>
					</a>{" "}
					which shows evidence of our efforts to test our software.
				</li>
				<li>
					This URL{" "}
					<a
						href="https://github.com/pondohoo/cs-179-cargoflow"
						className="text-blue-600 underline"
					>
						<strong>github.com/pondohoo/cs-179-cargoflow</strong>
					</a>{" "}
					points to a GitHub repository of our code.
				</li>
				<li className="">
					This{" "}
					<a href="https://youtu.be/X93dlakq2KQ" className="text-blue-600 underline">
						<strong>YouTube video</strong>
					</a>
					, that shows our software solving one balance, and one transfer test case (our choices, of the test cases Mr. Keogh gave us).
				</li>
				<li className="">
					This text file, is the {" "}
					<a href="https://drive.google.com/file/d/1iV4nN704zw3996auj11TexRCorT5U8I8/view?usp=sharing" className="text-blue-600 underline">
						<strong>KeoghsPort2024.txt</strong>
					</a> {""}
					log that was created by our software, during the making of the YouTube video in the previous bullet point.
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
					(EK says, this is optional) We would like to acknowledge the following resources that were helpful in completing this project.
					As not all members were experts on Javascript and Next.js, we had to research and learn the language and framework.
					The sources we consulted were: the{" "}
					<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" className="text-blue-600 underline">
						<strong>JavaScript documentation</strong>
					</a>,{" "}
					<a href="https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started" className="text-blue-600 underline">
						<strong>React documentation</strong>
					</a>,{" "}
					<a href="https://www.google.com/" className="text-blue-600 underline">
						<strong>Google</strong>
					</a>,{" "}
					<a href="https://stackoverflow.com/" className="text-blue-600 underline">
						<strong>Stack Overflow</strong>
					</a>,{" "}and{" "}
					<a href="https://www.geeksforgeeks.org/" className="text-blue-600 underline">
						<strong>GeeksforGeeks</strong>
					</a>.
				</li>
			</ol>
		</div>
	);
};

export default Submission;
