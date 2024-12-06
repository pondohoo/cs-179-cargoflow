import React from "react";

const Submission = () => {
	return (
		<div className="p-8 font-sans leading-relaxed">
			<h1 className="text-2xl font-bold mb-2">Team CargoMovers</h1>
			<p className="italic text-gray-600 mb-4">
				This webpage was last edited on 12-03-2024
			</p>

			<h2 className="text-xl font-semibold mb-2">Team Members</h2>
			<ul className="list-disc list-inside mb-4">
				<li>
					Joe Smith,{" "}
					<a href="mailto:joes@cs.ucr.edu" className="text-blue-600 underline">
						joes@cs.ucr.edu
					</a>
				</li>
				<li>
					Sue Tan,{" "}
					<a
						href="mailto:suetan@cs.ucr.edu"
						className="text-blue-600 underline"
					>
						suetan@cs.ucr.edu
					</a>
				</li>
				<li>
					Ning Hu,{" "}
					<a href="mailto:Nhi03@cs.ucr.edu" className="text-blue-600 underline">
						Nhi03@cs.ucr.edu
					</a>
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Project Files</h2>
			<ol className="list-decimal list-inside mb-4 space-y-2">
				<li>
					<strong>CargoMovers.pdf</strong> - Evidence of our efforts to plan our
					elicitation of requirements from Mr. Keogh, and any notes taken during
					the elicitation.
				</li>
				<li>
					<strong>CargoMoversProjectPitchORIGINAL.pdf</strong> - Our original
					pitch to Mr. Keogh, delivered on March 17th, 2023, at 10:00 AM.
				</li>
				<li>
					<strong>CargoMoversProjectPitchCORRECTED.pdf</strong> - A new version
					of the pitch with all corrections, amendments, and deletions suggested
					by Mr. Keogh (and/or Dr. Keogh).
				</li>
				<li>
					<strong>CargoMoversDesign.pdf</strong> - Evidence of our efforts to
					design our software.
				</li>
				<li>
					<strong>CargoMoversTesting.pdf</strong> - Evidence of our efforts to
					test our software.
				</li>
				<li>
					This URL:{" "}
					<a
						href="https://github.com/CargoMovers"
						className="text-blue-600 underline"
					>
						github.com/CargoMovers
					</a>{" "}
					- Points to a GitHub repository of our code.
				</li>
				<li>
					This{" "}
					<a href="#" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					- Shows our software solving one balance and one transfer test case.
				</li>
				<li>
					<strong>KeoghsPort2024.txt</strong> - Log created by our software
					during the making of the YouTube video.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Limitations</h2>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>We did not implement “recovery from a power outage”.</li>
				<li>
					We did not implement checks for the container name, so a naïve user
					might type in “NAN” as a container name and we would accept it.
				</li>
				<li>
					We did not implement duplicate name substitution. Duplicate named
					containers may lead to unexpected results.
				</li>
				<li>
					If there are more than 30 containers to be offloaded, our program may
					hang or crash (but this never happens for fewer than 30 containers).
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Optional Information</h2>
			<ul className="list-disc list-inside space-y-2">
				<li>Additional items for grading the project.</li>
				<li>
					Acknowledgments: We asked advice from Dr. Smith about heuristics,
					watched a{" "}
					<a href="#" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					about user interface design, and referred to the book
					<em>
						Simply Put!: Helping Stakeholders Discover and Define Requirements
						for IT Projects
					</em>{" "}
					by Thomas Hathaway.
				</li>
			</ul>
		</div>
	);
};

export default Submission;
